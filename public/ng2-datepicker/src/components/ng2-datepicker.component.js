"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var moment = require('moment');
var Moment = moment.default || moment;
var DateModel = (function () {
    function DateModel(obj) {
        this.day = obj && obj.day ? obj.day : null;
        this.month = obj && obj.month ? obj.month : null;
        this.year = obj && obj.year ? obj.year : null;
        this.formatted = obj && obj.formatted ? obj.formatted : null;
        this.momentObj = obj && obj.momentObj ? obj.momentObj : null;
    }
    return DateModel;
}());
exports.DateModel = DateModel;
var DatePickerOptions = (function () {
    function DatePickerOptions(obj) {
        this.autoApply = (obj && obj.autoApply === true) ? true : false;
        this.style = obj && obj.style ? obj.style : 'normal';
        this.locale = obj && obj.locale ? obj.locale : 'en';
        this.minDate = obj && obj.minDate ? obj.minDate : null;
        this.maxDate = obj && obj.maxDate ? obj.maxDate : null;
        this.initialDate = obj && obj.initialDate ? obj.initialDate : null;
        this.firstWeekdaySunday = obj && obj.firstWeekdaySunday ? obj.firstWeekdaySunday : false;
        this.format = obj && obj.format ? obj.format : 'YYYY-MM-DD';
    }
    return DatePickerOptions;
}());
exports.DatePickerOptions = DatePickerOptions;
exports.CALENDAR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DatePickerComponent; }),
    multi: true
};
var DatePickerComponent = (function () {
    function DatePickerComponent(el) {
        var _this = this;
        this.el = el;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.opened = false;
        this.currentDate = Moment();
        this.options = this.options || {};
        this.days = [];
        this.years = [];
        this.date = new DateModel({
            day: null,
            month: null,
            year: null,
            formatted: null,
            momentObj: null
        });
        this.generateYears();
        this.outputEvents = new core_1.EventEmitter();
        if (!this.inputEvents) {
            return;
        }
        this.inputEvents.subscribe(function (event) {
            if (event.type === 'setDate') {
                _this.value = event.data;
            }
            else if (event.type === 'default') {
                if (event.data === 'open') {
                    _this.open();
                }
                else if (event.data === 'close') {
                    _this.close();
                }
            }
        });
    }
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        get: function () {
            return this.date;
        },
        set: function (date) {
            if (!date) {
                return;
            }
            this.date = date;
            this.onChangeCallback(date);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = new DatePickerOptions(this.options);
        this.scrollOptions = {
            barBackground: '#C9C9C9',
            barWidth: '7',
            gridBackground: '#C9C9C9',
            gridWidth: '2'
        };
        if (this.options.initialDate instanceof Date) {
            this.currentDate = Moment(this.options.initialDate);
            this.selectDate(null, this.currentDate);
        }
        if (this.options.minDate instanceof Date) {
            this.minDate = Moment(this.options.minDate);
        }
        else {
            this.minDate = null;
        }
        if (this.options.maxDate instanceof Date) {
            this.maxDate = Moment(this.options.maxDate);
        }
        else {
            this.maxDate = null;
        }
        this.generateCalendar();
        this.outputEvents.emit({ type: 'default', data: 'init' });
        if (typeof window !== 'undefined') {
            var body = document.querySelector('body');
            body.addEventListener('click', function (e) {
                if (!_this.opened || !e.target) {
                    return;
                }
                ;
                if (_this.el.nativeElement !== e.target && !_this.el.nativeElement.contains(e.target)) {
                    _this.close();
                }
            }, false);
        }
        if (this.inputEvents) {
            this.inputEvents.subscribe(function (e) {
                if (e.type === 'action') {
                    if (e.data === 'toggle') {
                        _this.toggle();
                    }
                    if (e.data === 'close') {
                        _this.close();
                    }
                    if (e.data === 'open') {
                        _this.open();
                    }
                }
                if (e.type === 'setDate') {
                    if (!(e.data instanceof Date)) {
                        throw new Error("Input data must be an instance of Date!");
                    }
                    var date = Moment(e.data);
                    if (!date) {
                        throw new Error("Invalid date: " + e.data);
                    }
                    _this.value = {
                        day: date.format('DD'),
                        month: date.format('MM'),
                        year: date.format('YYYY'),
                        formatted: date.format(_this.options.format),
                        momentObj: date
                    };
                }
            });
        }
    };
    DatePickerComponent.prototype.generateCalendar = function () {
        var date = Moment(this.currentDate);
        var month = date.month();
        var year = date.year();
        var n = 1;
        var firstWeekDay = (this.options.firstWeekdaySunday) ? date.date(2).day() : date.date(1).day();
        if (firstWeekDay !== 1) {
            n -= (firstWeekDay + 6) % 7;
        }
        this.days = [];
        var selectedDate = this.date.momentObj;
        for (var i = n; i <= date.endOf('month').date(); i += 1) {
            var currentDate = Moment(i + "." + (month + 1) + "." + year, 'DD.MM.YYYY');
            var today = (Moment().isSame(currentDate, 'day') && Moment().isSame(currentDate, 'month')) ? true : false;
            var selected = (selectedDate && selectedDate.isSame(currentDate, 'day')) ? true : false;
            var betweenMinMax = true;
            if (this.minDate !== null) {
                if (this.maxDate !== null) {
                    betweenMinMax = currentDate.isBetween(this.minDate, this.maxDate, 'day', '[]') ? true : false;
                }
                else {
                    betweenMinMax = currentDate.isBefore(this.minDate, 'day') ? false : true;
                }
            }
            else {
                if (this.maxDate !== null) {
                    betweenMinMax = currentDate.isAfter(this.maxDate, 'day') ? false : true;
                }
            }
            var day = {
                day: i > 0 ? i : null,
                month: i > 0 ? month : null,
                year: i > 0 ? year : null,
                enabled: i > 0 ? betweenMinMax : false,
                today: i > 0 && today ? true : false,
                selected: i > 0 && selected ? true : false,
                momentObj: currentDate
            };
            this.days.push(day);
        }
    };
    DatePickerComponent.prototype.selectDate = function (e, date) {
        var _this = this;
        if (e) {
            e.preventDefault();
        }
        setTimeout(function () {
            _this.value = {
                day: date.format('DD'),
                month: date.format('MM'),
                year: date.format('YYYY'),
                formatted: date.format(_this.options.format),
                momentObj: date
            };
            _this.generateCalendar();
            _this.outputEvents.emit({ type: 'dateChanged', data: _this.value });
        });
        if (this.options.autoApply === true && this.opened === true) {
            this.opened = false;
        }
    };
    DatePickerComponent.prototype.selectYear = function (e, year) {
        var _this = this;
        e.preventDefault();
        setTimeout(function () {
            var date = _this.currentDate.year(year);
            _this.value = {
                day: date.format('DD'),
                month: date.format('MM'),
                year: date.format('YYYY'),
                formatted: date.format(_this.options.format),
                momentObj: date
            };
            _this.yearPicker = false;
            _this.generateCalendar();
        });
    };
    DatePickerComponent.prototype.generateYears = function () {
        var date = this.options.minDate || Moment().year(Moment().year() - 40);
        var toDate = this.options.maxDate || Moment().year(Moment().year() + 40);
        var years = toDate.year() - date.year();
        for (var i = 0; i < years; i++) {
            this.years.push(date.year());
            date.add(1, 'year');
        }
    };
    DatePickerComponent.prototype.writeValue = function (date) {
        if (!date) {
            return;
        }
        this.date = date;
    };
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DatePickerComponent.prototype.prevMonth = function () {
        this.currentDate = this.currentDate.subtract(1, 'month');
        this.generateCalendar();
    };
    DatePickerComponent.prototype.nextMonth = function () {
        this.currentDate = this.currentDate.add(1, 'month');
        this.generateCalendar();
    };
    DatePickerComponent.prototype.today = function () {
        this.currentDate = Moment();
        this.selectDate(null, this.currentDate);
    };
    DatePickerComponent.prototype.toggle = function () {
        this.opened = !this.opened;
        if (this.opened) {
            this.onOpen();
        }
        this.outputEvents.emit({ type: 'default', data: 'opened' });
    };
    DatePickerComponent.prototype.open = function () {
        this.opened = true;
        this.onOpen();
    };
    DatePickerComponent.prototype.close = function () {
        this.opened = false;
        this.outputEvents.emit({ type: 'default', data: 'closed' });
    };
    DatePickerComponent.prototype.onOpen = function () {
        this.yearPicker = false;
    };
    DatePickerComponent.prototype.openYearPicker = function () {
        var _this = this;
        setTimeout(function () { return _this.yearPicker = true; });
    };
    DatePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ng2-datepicker',
                    template: "\n  <div class=\"datepicker-container u-is-unselectable\">\n    <div class=\"datepicker-input-container\">\n      <input type=\"text\" class=\"datepicker-input\" [(ngModel)]=\"date.formatted\">\n      <div class=\"datepicker-input-icon\" (click)=\"toggle()\">\n        <i class=\"ion-ios-calendar-outline\"></i>\n      </div>\n    </div>\n    <div class=\"datepicker-calendar\" *ngIf=\"opened\">\n      <div class=\"datepicker-calendar-top\">\n        <span class=\"year-title\">{{ currentDate.format('YYYY') }}</span>\n        <button type=\"button\" (click)=\"openYearPicker()\" *ngIf=\"!yearPicker\">\n          <i class=\"ion-arrow-right-c\"></i>\n          Select Year\n        </button>\n        <i class=\"close ion-android-close\" (click)=\"close()\"></i>\n      </div>\n      <div class=\"datepicker-calendar-container\">\n        <div *ngIf=\"!yearPicker\">\n          <div class=\"datepicker-calendar-month-section\">\n            <i class=\"ion-ios-arrow-back\" (click)=\"prevMonth()\"></i>\n            <span class=\"month-title\">{{ currentDate.format('MMMM') }}</span>\n            <i class=\"ion-ios-arrow-forward\" (click)=\"nextMonth()\"></i>\n          </div>\n          <div class=\"datepicker-calendar-day-names\">\n            <span>S</span>\n            <span>M</span>\n            <span>T</span>\n            <span>W</span>\n            <span>T</span>\n            <span>F</span>\n            <span>S</span>\n          </div>\n          <div class=\"datepicker-calendar-days-container\">\n            <span class=\"day\" *ngFor=\"let d of days; let i = index\"\n                              (click)=\"selectDate($event, d.momentObj)\"\n                              [ngClass]=\"{ 'disabled': !d.enabled, 'today': d.today, 'selected': d.selected }\">\n              {{ d.day }}\n            </span>\n          </div>\n          <div class=\"datepicker-buttons\" *ngIf=\"!options.autoApply\">\n            <button type=\"button\" class=\"a-button u-is-secondary u-is-small\" (click)=\"today()\">Today</button>\n            <button type=\"button\" class=\"a-button u-is-primary u-is-small\" (click)=\"close()\">Apply</button>\n          </div>\n        </div>\n        <div *ngIf=\"yearPicker\">\n          <div class=\"datepicker-calendar-years-container\" slimScroll [options]=\"scrollOptions\">\n            <span class=\"year\" *ngFor=\"let y of years; let i = index\" (click)=\"selectYear($event, y)\">\n              {{ y }}\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
                    styles: ["\n  .datepicker-container {\n  display: inline-block;\n  position: relative; }\n  .datepicker-container .datepicker-input-container {\n    display: inline-block; }\n    .datepicker-container .datepicker-input-container .datepicker-input {\n      display: inline-block;\n      width: 160px;\n      margin-right: 15px;\n      border: none;\n      outline: none;\n      border-bottom: 1px solid #ced4da;\n      font-size: 14px;\n      color: #000000;\n      text-align: center; }\n      .datepicker-container .datepicker-input-container .datepicker-input::-webkit-input-placeholder {\n        color: #343a40; }\n      .datepicker-container .datepicker-input-container .datepicker-input::-moz-placeholder {\n        color: #343a40; }\n      .datepicker-container .datepicker-input-container .datepicker-input:-ms-input-placeholder {\n        color: #343a40; }\n      .datepicker-container .datepicker-input-container .datepicker-input:-moz-placeholder {\n        color: #343a40; }\n    .datepicker-container .datepicker-input-container .datepicker-input-icon {\n      display: inline-block; }\n      .datepicker-container .datepicker-input-container .datepicker-input-icon i {\n        font-size: 20px;\n        cursor: pointer; }\n  .datepicker-container .datepicker-calendar {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    width: 250px;\n    top: 40px;\n    position: absolute;\n    z-index: 99;\n    background: #FFFFFF;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); }\n    .datepicker-container .datepicker-calendar .datepicker-calendar-top {\n      width: 100%;\n      height: 80px;\n      background: #099268;\n      display: inline-block;\n      position: relative; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-top .year-title {\n        display: block;\n        margin-top: 12px;\n        color: #FFFFFF;\n        font-size: 28px;\n        text-align: center; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-top button {\n        width: 150px;\n        display: block;\n        margin: 0 auto;\n        color: #FFFFFF;\n        text-transform: uppercase;\n        background: transparent;\n        border: none;\n        outline: none;\n        font-size: 12px;\n        cursor: pointer; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-top .close {\n        position: absolute;\n        top: 5px;\n        right: 10px;\n        font-size: 20px;\n        color: #FFFFFF;\n        cursor: pointer; }\n    .datepicker-container .datepicker-calendar .datepicker-calendar-container {\n      display: inline-block;\n      width: 100%;\n      padding: 10px; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section {\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        font-size: 14px;\n        color: #000000;\n        text-transform: uppercase; }\n        .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i {\n          cursor: pointer; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:first-child {\n            margin-left: 12px; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-month-section i:last-child {\n            margin-right: 12px; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names {\n        width: 230px;\n        margin-top: 10px;\n        display: inline-block;\n        border: 1px solid transparent; }\n        .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-day-names span {\n          font-size: 12px;\n          display: block;\n          float: left;\n          width: calc(100% / 7);\n          text-align: center; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container {\n        width: 230px;\n        margin-top: 5px;\n        display: inline-block;\n        border: 1px solid transparent; }\n        .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          float: left;\n          font-size: 14px;\n          color: #000000;\n          width: calc(100% / 7);\n          height: 33px;\n          text-align: center;\n          border-radius: 50%;\n          cursor: pointer; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day:hover:not(.disabled), .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.selected {\n            background: #099268;\n            color: #FFFFFF !important; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.disabled {\n            pointer-events: none; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-days-container .day.today {\n            color: #fa5252; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container {\n        width: 100%;\n        height: 240px; }\n        .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-calendar-years-container .year {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          float: left;\n          font-size: 14px;\n          color: #000000;\n          width: calc(100% / 4);\n          height: 50px;\n          text-align: center;\n          border-radius: 50%;\n          cursor: pointer; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container\n          .datepicker-calendar-years-container .year:hover, .datepicker-container .datepicker-calendar .datepicker-calendar-container\n          .datepicker-calendar-years-container .year.selected {\n            background: #099268;\n            color: #FFFFFF !important; }\n      .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons {\n        width: 235px;\n        display: flex;\n        justify-content: center; }\n        .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button {\n          width: 100%;\n          outline: none;\n          display: inline-block;\n          border: 1px solid #099268;\n          background: #099268;\n          color: #FFFFFF;\n          margin-right: 5px;\n          border-radius: 5px;\n          cursor: pointer;\n          text-align: center;\n          padding: 5px 10px; }\n          .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary {\n            background: #FFFFFF;\n            color: #099268; }\n            .datepicker-container .datepicker-calendar .datepicker-calendar-container .datepicker-buttons button.u-is-secondary:hover {\n              color: #099268; }\n\n  "],
                    providers: [exports.CALENDAR_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    DatePickerComponent.propDecorators = {
        'options': [{ type: core_1.Input },],
        'inputEvents': [{ type: core_1.Input },],
        'outputEvents': [{ type: core_1.Output },],
    };
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
