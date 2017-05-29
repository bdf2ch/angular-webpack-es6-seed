import angular from 'angular';
import router from 'angular-route';
import mocks from 'angular-mocks';
import './index.html';
import './assets/styles/app.css';
import '../node_modules/font-awesome/css/font-awesome.css'
import { ViolationsModule } from './violations/violations.module';
import { UiModule } from './ui/ui.module';
import { ViolationsListComponent } from './violations/violations-list/violations-list.component';
import { ModalComponent } from './ui/modal/modal.component';
import { ModalsService } from './ui/modal/modals.service';
import { TabsComponent } from './ui/tabs/tabs.component';
import { TabComponent } from './ui/tabs/tab.component';
import { TestController } from './violations/test.controller';


export const AppModule = angular.module('app', [router, ViolationsModule.name, UiModule.name])
    .run(['$log', function ($log) {
        $log.log('app');
    }]);