import angular from 'angular';
import { DivisionsModule } from '../divisions.module';
import './divisions-tree-item.template.html';

export const DivisionsTreeItemComponent = angular
    .module(DivisionsModule.name)
    .component('divisionsTreeItem', {
        templateUrl: 'divisions/divisions-tree/divisions-tree-item.template.html',
        bindings: {
            children: '<',
            level: '=',
            tree: '='
        },
        controller: function () {
            let itemLevel = this.itemLevel = 0;

            this.$onInit = function () {
                this.itemLevel = parseInt(this.level);
                console.log('level = ', this.itemLevel);
            };

        }
    });