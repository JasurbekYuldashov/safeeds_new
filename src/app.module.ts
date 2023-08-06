import { Module } from '@nestjs/common';
import { ZipcodeModule } from './zipcodes/zipcode.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadController } from './file/file.upload.controller';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EmailController } from './email/email.controller';
import { ArticleModule } from './article/article.module';
import { PrismaService } from './prisma/prisma.service';
import { SatisfiedModule } from './satisfied/satisfied.module';
import { PostQuoteController } from './quote/quote.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FaqService } from './faq/faq.service';
import { FaqController } from 'faq/faq.controller';
import { CompanyReviewController } from 'companyReview/compantReview.controller';
import { CompanyReviewService } from 'companyReview/compantReview.service';
import { TeamUserController } from 'teamUser/teamUser.controller';
import { TeamUserService } from 'teamUser/teamUser.service';
import { TeamUserReviewController } from 'teamUserReview/teamUserReview.controller';
import { TeamUserReviewService } from 'teamUserReview/teamUserReview.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../uploads'),
      serveRoot: '/api/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
    ZipcodeModule,
    AuthModule,
    ArticleModule,
    SatisfiedModule,
  ],
  controllers: [
    FileUploadController,
    EmailController,
    PostQuoteController,
    FaqController,
    CompanyReviewController,
    TeamUserController,
    TeamUserReviewController,
  ],
  providers: [
    PrismaService,
    FaqService,
    FaqService,
    CompanyReviewService,
    TeamUserService,
    TeamUserReviewService,
  ],
})
export class AppModule {}
