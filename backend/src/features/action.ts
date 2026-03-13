

export interface Action<RequestDSType extends RequestDS, ResponseDSType extends ResponseDS>{
   execute(req:RequestDSType):Promise<ResponseDSType> | ResponseDSType;
}

export interface RequestDS{

}

export interface ResponseDS{
   success:boolean
}