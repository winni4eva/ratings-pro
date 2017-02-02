import {Component,Input,OnInit} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'tb-modal',
    template: `
        <style>
            .modal-overlay {
            background-color: rgba(0, 0, 0, .4);
            bottom: 0;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            z-index: 1000;
        }

        .modal {
            @include shadow-float();

            background-color: $white;
            left: calc(50% - 200px);
            max-height: calc(100% - 10em);
            min-height: 10em;
            overflow-y: auto;
            position: fixed;
            top: 5em;
            width: 400px;
            z-index: 1100;

            .title {
                background-color: $color-heading-bg;

                .right {
                    color: $color-text;
                    cursor: pointer;
                }

                .right:hover {
                    color: lighten($color-text, 10%);
                }
            }

            .title,
            .body {
                padding: .75em;
            }

            input,
            select {
                height: auto;
                margin-bottom: 7px;
            }

            .buttons {
                float: right;
                margin: 1em;
                margin-right: 0;

                .flat {
                    background-color: $white;
                    color: $color-text;
                    line-height: 1.1em;
                }
            }
        }
        
        </style>
        
        <div *ngIf="isOpen">
            <div class="modal-overlay" (click)="close(true)"></div>

            <div class="modal">
                <div class="title" *ngIf="modalTitle">
                    <h2>
                        {{ modalTitle }}
                        <span class="right" (click)="close()">
                            <i class="icon icon-cancel"></i>
                        </span>
                    </h2>
                </div>

                <div class="body">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    host: { '(document:keyup)': 'keyup($event)' }
})
export class Modal implements OnInit {
    @Input('modal-id') modalId: string;
    @Input('modal-title') modalTitle: string;
    @Input() blocking = false;
    isOpen: boolean = false;

    constructor(private modalService: ModalService) {
    }

    ngOnInit() {
        this.modalService.registerModal(this);
    }

    private close(checkBlocking = false): void {
        this.modalService.close(this.modalId, checkBlocking);
    }

    private keyup(event: KeyboardEvent): void {
        if (event.keyCode === 27) {
            this.modalService.close(this.modalId, true);
        }
    }
}