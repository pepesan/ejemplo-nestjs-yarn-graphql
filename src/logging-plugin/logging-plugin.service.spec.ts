import { Test, TestingModule } from '@nestjs/testing';
import { LoggingPluginService } from './logging-plugin.service';

describe('LoggingPluginService', () => {
  let service: LoggingPluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingPluginService],
    }).compile();

    service = module.get<LoggingPluginService>(LoggingPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
