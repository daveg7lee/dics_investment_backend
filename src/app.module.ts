import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { StockModule } from './stock/stock.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        };
      },
    }),
    UserModule,
    CompanyModule,
    StockModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
