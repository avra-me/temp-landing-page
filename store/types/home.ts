export type MarkdownString = string;

interface BasicItem {
    order: number,
    disabled?: boolean
    visible?: boolean
    content: MarkdownString
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
export interface WaveCardSection extends BasicItem {
    type: 'WaveCardSection',
    title: string,
    subTitle: string,
    items: WaveCardItem[]
}
export interface HorizontalCardSection extends BasicItem {
    type: 'HorizontalCardSection',
    title: string,
    subTitle: string,
    items: HorizontalCardItem[]
}
export interface DynamicForm extends BasicItem {
    type: 'DynamicForm',
    name: string,
    fields: (IFormField | ISubmitOverride)[]
}


export interface IconCardItem extends BasicItem {
    title: string
    icon: string,
    color: string,
    buttons: InteractionItem[]
}
export interface WaveCardItem extends BasicItem {
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
export interface IFormField {
    type: 'email' | 'phone' | 'multiline' | 'text';
    title: string;
    name: string;
    required: boolean;
    placeholder?: string;
    icon?: string;
}

interface ISubmitOverride {
    type: 'submit';
    title: string;
}


export interface GenericItem extends Omit<BasicItem, 'order'>{
    type: 'GenericItem';
    header: MarkdownString;
    title: string;
    subTitle?: string;
    startDate: string;
    endDate: string;
    link: string;
    date: string;
    short: MarkdownString;
    featured: boolean;
    image: string;
    showYearOnly: boolean;
    tages: string[];
}


export type HomeItems = JumboHeaderSection | IconCardSection | HorizontalCardSection | WaveCardSection | DynamicForm

export interface HomeState {
    items: (HomeItems)[]
    item?: GenericItem
}

export const initialHomeState = {
    items: [],
}
