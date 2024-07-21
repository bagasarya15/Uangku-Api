import { FilterDashboardDto, FilterPengeluaranByCategoryDto } from './dto/filter-dashboard.dto';
export declare class DashboardService {
    constructor();
    indexDashboard(body: FilterDashboardDto): Promise<any>;
    filterPengeluaranByCategory(body: FilterPengeluaranByCategoryDto): Promise<any>;
}
