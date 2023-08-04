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

@Module({
  imports: [
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
  ],
  providers: [PrismaService, FaqService, FaqService, CompanyReviewService],
})
export class AppModule {}
