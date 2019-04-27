import Vue, { PluginObject } from 'vue';
import Test from './Test.vue';

export const components = [ Test ];

export const installers = components.map((component) => {
    return {
        install: (MyVue: typeof Vue) => {
            MyVue.component(component.name, component);
        },
    };
}) as Array<PluginObject<{}>>;
