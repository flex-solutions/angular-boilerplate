import { UserGroup } from './user-group.model';
import { IFilterChangedEvent } from '../ui-common/datagrid/components/datagrid.component';
import { User } from './user.model';

export class TransferGroupData {
     user: User;
     filterEvent: IFilterChangedEvent;
}
