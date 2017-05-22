import angular from 'angular';
import router from 'angular-route';
import { ViolationsModule } from './violations/violations.module';
import { UiModule } from './ui/ui.module';
import { ViolationsListComponent } from './violations/violations-list/violations-list.component';
import { ModalComponent } from './ui/modal/modal.component';
import { ModalsService } from './ui/modal/modals.service';
import { TestController } from './violations/test.controller';


export const AppModule = angular.module('app', [router, ViolationsModule.name, UiModule.name])
    .run(['$log', function ($log) {
        $log.log('app');
    }]);