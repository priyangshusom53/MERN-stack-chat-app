export interface Action<ReqType, ResType> {
   Execute(req: ReqType): ResType | Promise<ResType>
}

export interface RequestDS { }

export interface ResultDS {
   success: boolean;
   statusMessage?: string;
}