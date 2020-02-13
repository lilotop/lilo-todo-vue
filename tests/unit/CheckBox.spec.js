import { mount } from '@vue/test-utils'
import CheckBox from '@/components/CheckBox.vue'
import Vue from 'vue';

/***
 * Generates a wrapper that contains a parent component bound to the checkbox with v-model.
 * @param initialValue the initial state of the checkbox (checked/unchecked)
 * @returns the wrapper of the parent component holding this checkbox
 */
function createVModelWrapper(initialValue) {
    let parent = Vue.component('parent', {
        components: { CheckBox },
        template: `
            <div>test:
                <CheckBox v-model="value"/>
            </div>`,
        data() {
            return {
                value: initialValue || false,
            }
        }
    });
    return mount(parent);
}

/***
 * Generates a wrapper that contains a parent component bound to the checkbox with v-model and a label that is connected with a for attribute.
 * @param initialValue the initial state of the checkbox (checked/unchecked)
 * @returns the wrapper of the parent component holding this checkbox and a label
 */
function createVModelWrapperWithLabel(initialValue) {
    let parent = Vue.component('parent', {
        components: { CheckBox },
        template: `
            <div>test:
                <CheckBox v-model="value" id="my-checkbox"/>
                <label for="my-checkbox">The label</label>
            </div>`,
        data() {
            return {
                value: initialValue || false,
            }
        }
    });
    return mount(parent, {attachToDocument: true});
}

describe('CheckBox.vue', () => {

    test('initial state', () => {
        let wrapper = mount(CheckBox);
        expect(wrapper.element.localName).toEqual('span');
        expect(wrapper.attributes('tabindex')).toEqual('0');
        expect(wrapper.find('span').classes()).not.toContain('readonly')
    });

    test('initial state - readonly true', () => {
        let wrapper = mount(CheckBox, { propsData: { checked: true } });
        expect(wrapper.element.localName).toEqual('span');
        expect(wrapper.attributes('tabindex')).toEqual('');
        expect(wrapper.html()).toContain('path');
        expect(wrapper.find('span').classes()).toContain('readonly')
    });

    test('initial state - readonly false', () => {
        let wrapper = mount(CheckBox, { propsData: { checked: false } });
        expect(wrapper.element.localName).toEqual('span');
        expect(wrapper.attributes('tabindex')).toEqual('');
        expect(wrapper.html()).not.toContain('path');
        expect(wrapper.find('span').classes()).toContain('readonly')
    });

    test('click to check', () => {
        let wrapper = createVModelWrapper();
        expect(wrapper.vm.value).toEqual(false);
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.value).toEqual(true);
    });

    test('click to uncheck', () => {
        let wrapper = createVModelWrapper(true);
        expect(wrapper.vm.value).toEqual(true);
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.value).toEqual(false);
    });

    test('space to check', () => {
        let wrapper = createVModelWrapper();
        expect(wrapper.vm.value).toEqual(false);
        wrapper.find('span').trigger('keypress.space');
        expect(wrapper.vm.value).toEqual(true);
    });

    test('space to uncheck', () => {
        let wrapper = createVModelWrapper(true);
        expect(wrapper.vm.value).toEqual(true);
        wrapper.find('span').trigger('keypress.space');
        expect(wrapper.vm.value).toEqual(false);
    });

    test('click on readonly', () => {
        let wrapper = createVModelWrapper();
        expect(wrapper.vm.value).toEqual(false);
        wrapper.find('span').setProps({ checked: false }); // should now be readonly
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.value).toEqual(false);
    });

    test('click on label', () => {
        let wrapper = createVModelWrapperWithLabel();
        expect(wrapper.vm.value).toEqual(false);
        wrapper.find('label').trigger('click');
        expect(wrapper.vm.value).toEqual(true);
    });

    test('click on label when readonly ', () => {
        let wrapper = createVModelWrapperWithLabel();
        expect(wrapper.vm.value).toEqual(false);
        wrapper.find('span').setProps({ checked: false }); // should now be readonly
        wrapper.find('label').trigger('click');
        expect(wrapper.vm.value).toEqual(false);
    })

});
