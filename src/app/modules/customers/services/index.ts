import { AddressService } from './address.service';
import { CustomerService } from './customer.service';
import { MemberTypeService} from './member-type.service';

export const customerModuleServices = [
    CustomerService,
    AddressService,
    MemberTypeService
];
