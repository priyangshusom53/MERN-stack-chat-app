import type { ResponseDS } from "./action.js";

export interface Presenter<ResponseDSType,ViewModelType>{
   present(res:ResponseDSType):Promise<ViewModelType> | ViewModelType;
}