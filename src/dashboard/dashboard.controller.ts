import { Controller, Post, Body } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { FilterDashboardDto } from './dto/filter-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Post('')
  getIndexDashboard(@Body() body: FilterDashboardDto) {
    // console.log(body, 'INI CEK PAGE LIMIT');
    return this.dashboardService.indexDashboard(body);
  }
}
