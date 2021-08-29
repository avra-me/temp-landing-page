export interface SiteState {
    title: string,
    siteUrl: string,
    description: string,
    sitePreview?: string,
    logo?: string,
    author?: SiteAuthor
    icons: SitePreview[]
}

export interface SiteAuthor {
    first_name?: string
    last_name?: string
    gender?: string
    summary?: string
}

export interface SitePreview {
    size: string;
    path: string
}

export const initialSiteState = {
    title: "",
    siteUrl: "",
    description: "",
    icons: []
}