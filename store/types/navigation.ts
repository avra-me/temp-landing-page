import React from "react";

interface MenuItemLink {
    title: string
    link: string
    icon?: string
    order?: number
    type?: 'navigation'
}

export interface MenuItemButton {
    title: string
    onClick: () => void
    icon?: string
    order?: number
    type?: 'navigation'
}

export type MenuItem = MenuItemLink | MenuItemButton | React.ReactElement

export interface NavigationState {
    menuItems: MenuItem[]
    staticIconEnabled: boolean
    disabled: boolean
}

export const initialNavigationState = {
    menuItems: [],
    staticIconEnabled: true,
    disabled: false
}