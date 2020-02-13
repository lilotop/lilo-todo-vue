import { shallowMount } from '@vue/test-utils'
import List from '@/components/List.vue'

describe('List.vue', () => {

    test('basic usage', () => {

        // keep a history of the formatter function calls
        let formatterHistory = [];
        let formatter = jest.fn((value) => formatterHistory.push(value) && value.toUpperCase());

        // mount with test data
        let wrapper = shallowMount(List, {
            propsData: {
                columns: [
                    {
                        header: 'Name',
                        field: 'name',
                    },
                    {
                        header: 'Color',
                        field: 'color',
                        formatter
                    },
                ],
                items: [
                    { name: 'alpha', color: 'red' },
                    { name: 'bravo', color: 'green' },
                    { name: 'charlie', color: 'blue' },
                ]
            }
        });

        // verify formatter function was called for all items
        expect(formatter).toHaveBeenCalledTimes(3);
        expect(formatterHistory).toEqual(['red', 'green', 'blue']);

        // verify that the formatted value is in output
        expect(wrapper.html()).toContain('RED');
        expect(wrapper.html()).toContain('GREEN');
        expect(wrapper.html()).toContain('BLUE');

        // verify that the original value is not in output
        expect(wrapper.html()).not.toContain('red');
        expect(wrapper.html()).not.toContain('green');
        expect(wrapper.html()).not.toContain('blue');

        // verify that the non-formatted columns are in ouput as is
        expect(wrapper.html()).toContain('alpha');
        expect(wrapper.html()).toContain('bravo');
        expect(wrapper.html()).toContain('charlie');

        // click to select first item
        expect(wrapper.emitted()).toEqual({});
        expect(wrapper.findAll('.list__item')).toHaveLength(3);
        wrapper.find('.list__item').trigger('click');
        expect(wrapper.emitted().selected).toEqual([[{color:'red',name:'alpha'}]]);
    });

});
