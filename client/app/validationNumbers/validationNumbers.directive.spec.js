'use strict';

describe('<Unit Test> Validation Numbers Directive', function () {
    var $compile, $scope, form;

    beforeEach(module('kposApp'));
    beforeEach(module('app/main/partials/login.html'));
    beforeEach(module('app/main/main.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope.$new();
    }));

    describe('Integer', function () {
        beforeEach(function() {
            $compile('<form name="form"><input name="item" validation-numbers validation-type="integer" type="text" ng-model="item.quantity"/></form>')($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should allow only numbers integer', function () {
            form.item.$setViewValue('23a');
            expect($scope.item.quantity).toBe('23');
        });

        it('should allow only numbers integer', function () {
            form.item.$setViewValue('b2a3a.a');
            expect($scope.item.quantity).toBe('23');
        });
    });

    describe('Float', function () {
        beforeEach(function() {
            $compile('<form name="form"><input name="item" validation-numbers validation-type="float" type="text" ng-model="item.quantity"/></form>')($scope);
            $scope.$digest();
            form = $scope.form;
        });

        it('should allow numbers integer and float', function () {
            form.item.$setViewValue('23.4a');
            expect($scope.item.quantity).toBe('23.4');
        });

        it('should allow numbers integer and float', function () {
            form.item.$setViewValue('cc23a.4a');
            expect($scope.item.quantity).toBe('23.4');
        });
    });
});
