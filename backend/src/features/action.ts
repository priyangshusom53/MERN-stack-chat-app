

export interface Action<RequestDSType extends RequestDS, ResponseDSType extends ResponseDS>{
   execute(req:RequestDSType):Promise<ResponseDSType> | ResponseDSType;
}

export interface RequestDS{

}

export type ResponseDS<TSuccess = {}, TError = {}> =
  | ({ success: true } & TSuccess)
  | ({ success: false } & TError)