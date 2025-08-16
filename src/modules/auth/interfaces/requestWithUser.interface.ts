import { Request } from 'express';
import { Users } from 'src/libs/common/models';

interface RequestWithUser extends Request {
  user: Users;
}

export default RequestWithUser;
