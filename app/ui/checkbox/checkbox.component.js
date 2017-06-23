import { UiModule } from '../ui.module';
import './checkbox.component.html';
import './checkbox.component.css';


export const CheckBoxComponent = angular
    .module(UiModule.name)
    .component('checkbox', {
        templateUrl: 'ui/checkbox/checkbox.component.html',
        bindings: {
            onChange: '&',
            ngModel: '<'
        },
        require: {
          ngModelCtrl: 'ngModel'
        },
        controller: ['$log', function ($log) {
            this.checked = false;


            /**
             * Отслеживание изменений модели
             * @param changes {Object} - объект с информацией об изменениях
             */
            this.$onChanges = function (changes) {
                this.checked = changes.ngModel.currentValue;
            };


            /**
             * Триггер переключения состояния чекбокса
             */
            this.change = function () {
                this.checked = !this.checked;
                this.ngModelCtrl.$setViewValue(this.checked);
                if (this.onChange !== undefined)
                    this.onChange({ checked: this.checked });
            };
        }]
    });
