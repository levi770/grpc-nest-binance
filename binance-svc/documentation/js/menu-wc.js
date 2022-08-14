'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">binance-svc documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BinanceModule.html" data-type="entity-link" >BinanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' : 'data-target="#xs-controllers-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' :
                                            'id="xs-controllers-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' }>
                                            <li class="link">
                                                <a href="controllers/BinanceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BinanceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' : 'data-target="#xs-injectables-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' :
                                        'id="xs-injectables-links-module-BinanceModule-acf04114382d359ce456fdae6159104fffeb7486e2a4abb090c0b44310d9c00b1956db7b4986a5126d799535dc56aece12a0f6cda14ead634598902f5a4a04db"' }>
                                        <li class="link">
                                            <a href="injectables/BinanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BinanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Spread.html" data-type="entity-link" >Spread</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BinanceServiceClient.html" data-type="entity-link" >BinanceServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BinanceServiceController.html" data-type="entity-link" >BinanceServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Empty.html" data-type="entity-link" >Empty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetSpreadResponse.html" data-type="entity-link" >GetSpreadResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetSpreadRequest.html" data-type="entity-link" >SetSpreadRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetSpreadResponse.html" data-type="entity-link" >SetSpreadResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscribeFeedRequest.html" data-type="entity-link" >SubscribeFeedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubscribeFeedResponse.html" data-type="entity-link" >SubscribeFeedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnsubscribeFeedRequest.html" data-type="entity-link" >UnsubscribeFeedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnsubscribeFeedResponse.html" data-type="entity-link" >UnsubscribeFeedResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});