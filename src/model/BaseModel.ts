import { CreateDateColumn } from '../decorator/columns/CreateDateColumn';
import { UpdateDateColumn } from '../decorator/columns/UpdateDateColumn';

export class BaseModel {
  @CreateDateColumn({ type: 'timestamp' })
  createAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: number;
}
