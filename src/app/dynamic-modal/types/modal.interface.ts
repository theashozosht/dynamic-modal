export interface IModalConfig {
    config: boolean, // should open modal
    modalSchema: IModalSchema // schema object 
}

export interface IModalSchema {
    title?: string, // title/content in the modal
    content?: string, // the body content of modal
    class: string, // css class on the host element of modal
    icon: string, // middle icon of the modal
    maxWidth: number, // css max-width: <number>
    button: Array<IModalSchemaButton>, // Buttons array list
    shouldClose?(): Promise<boolean> | boolean, // validate something when X mark is clicked or user clicked outside of modal
    onClose?(): Promise<boolean> | boolean // define functionality on closing of modal
}

export interface IModalSchemaButton {
    name: string, // content of button
    class: string // css class of button
    shouldClick?(): Promise<boolean> | boolean, // define some validation if it was true then resume the progress
    onClick?(): Promise<boolean> | boolean, // define a function on the button click
}