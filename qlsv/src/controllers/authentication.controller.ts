// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {authenticate, TokenService} from '@loopback/authentication';
import {
    Credentials,
    MyUserService,
    TokenServiceBindings,
    User,
    UserRepository,
    UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
    getModelSchemaRef,
    post,
    requestBody,
    SchemaObject
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
// ----------------------------------
@model()
export class NewUserRequest extends User {
    @property({
        type: 'string',
        required: true,
    })
    password: string;
}

const CredentialsSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
      'application/json': {schema: CredentialsSchema},
  },
};

export class AuthenticationController {
  constructor(
      @inject(TokenServiceBindings.TOKEN_SERVICE)
      public jwtService: TokenService,
      @inject(UserServiceBindings.USER_SERVICE)
      public userService: MyUserService,
      @inject(SecurityBindings.USER, {optional: true})
      public user: UserProfile,
      @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('/users/login', {
      responses: {
          '200': {
              description: 'Token',
              content: {
                  'application/json': {
                      schema: {
                          type: 'object',
                          properties: {
                              token: {
                                  type: 'string',
                              },
                          },
                      },
                  },
              },
          },
      },
  })
  async login(
      @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
      // ensure the user exists, and the password is correct
      const user = await this.userService.verifyCredentials(credentials);
      // convert a User object into a UserProfile object (reduced set of properties)
      const userProfile = this.userService.convertToUserProfile(user);

      // create a JSON Web Token based on the user profile
      const token = await this.jwtService.generateToken(userProfile);
      return {token};
  }

  @authenticate('jwt')
  @post('/user/changepassword', {
      responses: {
          '200': {
              content: {
                  'application/json': {
                      schema: {
                          type: 'string',
                      },
                  },
              },
          },
      },
  })
  async changePassowrd(
      @requestBody({
          content: {
              'application/json': {
                  schema: {
                      type: 'object',
                      required: ['newPassword'],
                      properties: {
                          newPassword: {
                              type: 'string',
                              minLength: 8,
                          },
                      },
                  },
              },
          },
      })
      @inject(SecurityBindings.USER)
      currentUserProfile: UserProfile,
      newPassword: {
          newPassword: string;
      },
  ): Promise<{'status': string}> {
      const password = await hash(newPassword.newPassword, await genSalt());
      console.log(currentUserProfile[securityId])
      await this.userRepository.userCredentials(currentUserProfile[securityId]).patch({
          password: password
      })

      return {'status': 'Succsess'};
  }

  @post('/signup', {
      responses: {
          '200': {
              description: 'User',
              content: {
                  'application/json': {
                      schema: {
                          'x-ts-type': User,
                      },
                  },
              },
          },
      },
  })
  async signUp(
      @requestBody({
          content: {
              'application/json': {
                  schema: getModelSchemaRef(NewUserRequest, {
                      title: 'NewUser',
                  }),
              },
          },
      })
      newUserRequest: NewUserRequest,
  ): Promise<{'status': string}> {
      const password = await hash(newUserRequest.password, await genSalt());
      const savedUser = await this.userRepository.create(
          _.omit(newUserRequest, 'password'),
      );

      await this.userRepository.userCredentials(savedUser.id).create({password});

      return {'status': 'Succsess'};
  }
}


