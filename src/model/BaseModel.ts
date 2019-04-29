import {CreateDateColumn} from "../decorator/columns/CreateDateColumn";
import {UpdateDateColumn} from "../decorator/columns/UpdateDateColumn";

export class BaseModel {
    @CreateDateColumn({type: "timestamp"})
    createdAt: number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: number;
}
