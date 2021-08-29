interface BasicItem {
    order: number,
    disabled?: boolean
    visible?: boolean
    content: string
}

export interface JumboHeaderSection extends BasicItem {
    type: 'JumboHeader'
    monogram?: string
}

export interface IconCardSection extends BasicItem {
    type: 'IconCardSection',
    title: string,
    subTitle: string,
    items: IconCardItem[]
}
export interface HorizontalCardSection extends BasicItem {
    type: 'HorizontalCardSection',
    title: string,
    subTitle: string,
    items: HorizontalCardItem[]
}

export interface IconCardItem extends BasicItem {
    title: string
    icon: string,
    color: string,
    buttons: InteractionItem[]
}

export interface HorizontalCardItem extends BasicItem {
    title: string
    image: string,
    buttons: InteractionItem[]
}

export interface InteractionItem {
    title: string
    link: string
    tooltip?: string
    icon?: string
}

export type HomeItems = JumboHeaderSection | IconCardSection | HorizontalCardSection

export interface HomeState {
    items: (HomeItems)[]
}

export const initialHomeState = {
    items: [],
}