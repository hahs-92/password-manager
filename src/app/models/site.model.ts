export interface ISite {
  id: string;
  siteName: string;
  siteURL: string;
  siteImgURL: string;
}

export type createSiteDTO = Omit<ISite, 'id'>;

export type editSiteDTO = Partial<ISite>;
