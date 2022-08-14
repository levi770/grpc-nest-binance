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
                    <a href="index.html" data-type="index-link">api-gateway documentation</a>
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
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' : 'data-target="#xs-controllers-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' :
                                            'id="xs-controllers-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' : 'data-target="#xs-injectables-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' :
                                        'id="xs-injectables-links-module-AuthModule-5570d1538a74e6336ac59c88ae1410112552047650ffd309ce13a21735c7eed3e9e457a7ecd2d9b6f4a79366619dc2737db523d5bfcd62dc7c05f21dce13328b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BinanceModule.html" data-type="entity-link" >BinanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BinanceModule-3f02c4aa1debb795845c4d591b2337439db3189b6fb61460422e275f13c38ec6ff1c06c0e61f366f49c374736243188682869e64c031a1302b00dc8937cee35c"' : 'data-target="#xs-controllers-links-module-BinanceModule-3f02c4aa1debb795845c4d591b2337439db3189b6fb61460422e275f13c38ec6ff1c06c0e61f366f49c374736243188682869e64c031a1302b00dc8937cee35c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BinanceModule-3f02c4aa1debb795845c4d591b2337439db3189b6fb61460422e275f13c38ec6ff1c06c0e61f366f49c374736243188682869e64c031a1302b00dc8937cee35c"' :
                                            'id="xs-controllers-links-module-BinanceModule-3f02c4aa1debb795845c4d591b2337439db3189b6fb61460422e275f13c38ec6ff1c06c0e61f366f49c374736243188682869e64c031a1302b00dc8937cee35c"' }>
                                            <li class="link">
                                                <a href="controllers/BinanceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BinanceController</a>
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
                                <a href="classes/BinanceGateway.html" data-type="entity-link" >BinanceGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSpreadResponceDto.html" data-type="entity-link" >GetSpreadResponceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginRequestDto.html" data-type="entity-link" >LoginRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterRequestDto.html" data-type="entity-link" >RegisterRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterResponseDto.html" data-type="entity-link" >RegisterResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSpreadRequestDto.html" data-type="entity-link" >SetSpreadRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSpreadResponceDto.html" data-type="entity-link" >SetSpreadResponceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationException.html" data-type="entity-link" >ValidationException</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WsValidationPipe.html" data-type="entity-link" >WsValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WsAuthGuard.html" data-type="entity-link" >WsAuthGuard</a>
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
                                <a href="interfaces/AuthServiceClient.html" data-type="entity-link" >AuthServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthServiceController.html" data-type="entity-link" >AuthServiceController</a>
                            </li>
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
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterRequest.html" data-type="entity-link" >RegisterRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterResponse.html" data-type="entity-link" >RegisterResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
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
                            <li class="link">
                                <a href="interfaces/ValidateRequest.html" data-type="entity-link" >ValidateRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidateResponse.html" data-type="entity-link" >ValidateResponse</a>
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
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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