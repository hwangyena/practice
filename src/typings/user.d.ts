interface AxiosResponseType {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

interface UserInfo extends AxiosResponseType {
  id: number;
  loginId: string;
  name: string;
  phone: string;
  role: string;
  svcId: string;
  jobInfoIds: { domainNo: string; channelId: string; svcId: string }[];
}
