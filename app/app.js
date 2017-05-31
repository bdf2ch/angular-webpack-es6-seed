import angular from 'angular';
import router from 'angular-route';
import mocks from 'angular-mocks';
import './index.html';
import './assets/styles/app.css';
//import '../node_modules/angular-material/angular-material.min.css';
import './assets/styles/gears/gears.css';
import '../node_modules/font-awesome/css/font-awesome.css'
import { UsersModule } from './users/users.module';
import { ViolationsModule } from './violations/violations.module';
import { UiModule } from './ui/ui.module';
import { ViolationsListComponent } from './violations/violations-list/violations-list.component';
import { ModalComponent } from './ui/modal/modal.component';
import { ModalsService } from './ui/modal/modals.service';
import { TabsComponent } from './ui/tabs/tabs.component';
import { TabComponent } from './ui/tabs/tab.component';
import { TestController } from './violations/test.controller';

import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersService } from './users/users.service';


export const AppModule = angular.module('app', [router, ViolationsModule.name, UsersModule.name, UiModule.name])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<violations-list></violations-list>'
            })
            .when('/users', {
                template: '<users-list></users-list>'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .value('API', '/serverside/api.php')
    .run(['$log', function ($log) {
        $log.log('app');
    }]);