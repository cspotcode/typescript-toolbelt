import {ComponentClass, Component} from 'react';
export {
    PropsType,
    PropsTypeOfFactory,
    PropsTypeOfClass,
    StateType,
    StateTypeOfFactory,
    StateTypeOfClass
};

/** Extract Props type of a Component (instance) type */
type PropsType<C extends Component<any>> = C extends Component<infer P> ? P : never;

/** Extract Props type of a Component factory type (a function that returns a component instance) */
type PropsTypeOfFactory<CF extends (...args: any[]) => Component> = PropsType<ReturnType<CF>>;

/** Given a ComponentClass type (constructor function), extracts Props type */
type PropsTypeOfClass<CC extends ComponentClass> = PropsType<InstanceType<CC>>;

/** Extract State type of a Component (instance) type */
type StateType<C extends Component> = C extends Component<any, infer S> ? S : never;

/** Extract State type of a Component factory type (a function that returns a component instance) */
type StateTypeOfFactory<CF extends (...args: any[]) => Component> = StateType<ReturnType<CF>>;

/** Extract State type of a ComponentClass type (constructor function) */
type StateTypeOfClass<CC extends ComponentClass> = StateType<InstanceType<CC>>;
