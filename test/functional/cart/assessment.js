import { assert } from 'chai';
import * as assess from '../../mocks/testDataMgr/pageObjects/assessmentpage';

describe('Navigate to Shipping Page Testing', function () {

    var productNameOnPDP;
    var productPriceOnPDP;
    var productNameOnCheckout;
    var productPriceOnCheckout;
    var uniqueNum = Date.now();

    before(function () {
        browser.setViewportSize({
            width: 500,
            height: 500
        })
        var windowSize = browser.windowHandleSize();
        browser.windowHandleMaximize([windowSize])
        browser.url('/s/MovadoUS/en_US/home');
    })

    it('Continue to movado.com test', function () {
        browser.waitForExist(assess.continueHere)
        var continueHere = browser.isExisting(assess.continueHere)
        assert.isTrue(continueHere, 'Continue link is visible')
        browser.click(assess.continueHere)
    })

    it('Navigation link displayed and clickable', function () {
        browser.waitForEnabled(assess.shopWatchesLink, 30000)
        browser.moveToObject(assess.shopWatchesLink)
        browser.waitForVisible(assess.mensDesignNavLink)
        var mensDesignVisible = browser.isVisible(assess.mensDesignNavLink)
        assert.isTrue(mensDesignVisible, 'Mens Design link is visible')
        browser.click(assess.mensDesignNavLink)
    })

    it('Product available on PLP', function () {
        browser.waitForVisible(assess.productLink, 60000)
        browser.moveToObject(assess.productLink)
        browser.click(assess.productLink)
    })

    it('Add to Cart and Checkout now displayed', function () {
        browser.waitForVisible(assess.addToCartBtn, 60000)
        browser.moveToObject(assess.addToCartBtn)
        var addToCartVisible = browser.isVisible(assess.addToCartBtn)
        assert.isTrue(addToCartVisible, 'Add to cart visible')
        productNameOnPDP = browser.getText(assess.productNamePDP)
        productPriceOnPDP = browser.getText(assess.productPricePDP)
        browser.click(assess.addToCartBtn)
        browser.waitForVisible(assess.checkoutNowLink, 60000)
        var checkoutNowVisible = browser.isVisible(assess.checkoutNowLink)
        assert.isTrue(checkoutNowVisible, 'Checkout Now visible')
        browser.click(assess.checkoutNowLink)
    })

    it('Product Name and price match on Checkout', function () {
        browser.waitForVisible(assess.productNameCheckout, 60000)
        productNameOnCheckout = browser.getText(assess.productNameCheckout)
        productPriceOnCheckout = browser.getText(assess.productPriceCheckout)
        assert.equal(productNameOnPDP, productNameOnCheckout, 'Product name is correct')
        assert.equal(productPriceOnPDP, productPriceOnCheckout, 'Product price is correct')
    })

    it('Checkout button is displayed', function () {
        browser.waitForVisible(assess.checkoutBtn, 60000)
        var checkoutBtn = browser.isVisible(assess.checkoutBtn)
        assert.isTrue(checkoutBtn, 'Checkout button is displayed')
        browser.click(assess.checkoutBtn)
    })

    it('Checkout as guest', function () {
        browser.waitForVisible(assess.checkoutAsGuestBtn, 60000)
        var checkoutAsGuestVisible = browser.isVisible(assess.checkoutAsGuestBtn)
        assert.isTrue(checkoutAsGuestVisible, 'Checkout as guest button is displayed')
        browser.click(assess.checkoutAsGuestBtn)
    })

    it('Shipping tax levied', function () {
        browser.waitForVisible(assess.shippingCost, 60000)
        var shippingCostLevied = browser.isVisible(assess.shippingCost)
        assert.isTrue(shippingCostLevied, 'Shipping cost is displayed')

    })

    it('Shipping details page displayed', function () {
        browser.waitForVisible(assess.shippingOrderSummary, 60000)
        var orderSummary = browser.isVisible(assess.shippingOrderSummary)
        assert.isTrue(orderSummary, 'Shipping page is displayed')
    })

    it('Shipping details filling', function () {
        browser.setValue(assess.firstNameTextField, 'testfirst')
        browser.setValue(assess.lastNameTextField, 'testlast')
        browser.setValue(assess.companyTextField, 'textcompany')
        browser.setValue(assess.addressOneTextField, 'testaddress')
        browser.selectByVisibleText(assess.countrySelectList, 'United States')
        browser.selectByVisibleText(assess.stateSelectList, 'Alabama')
        browser.waitForEnabled(assess.shippingMethodFedExOvernight)
        browser.setValue(assess.cityTextField, 'testcity')
        browser.setValue(assess.zipCodeTextField, '35801')
        browser.setValue(assess.phoneNumberTextField, '5417543010')
        browser.click(assess.nextPaymentBtn)
    })

    it('Payment details filling', function () {
        browser.waitForVisible(assess.emailReviewOrder, 60000)
        var emailVisible = browser.isVisible(assess.emailReviewOrder)
        assert.isTrue(emailVisible, 'Payment page is displayed')
        browser.setValue(assess.emailReviewOrder, 'automation '+ uniqueNum+ '@yopmail.com')
        browser.click(assess.creditDebitRadio)
        browser.waitForVisible(assess.paymentHolderName)
        browser.setValue(assess.paymentHolderName, 'Automation Testing')
        browser.setValue(assess.cardNumber, '4111111111111111')
        browser.selectByVisibleText(assess.expirationMonth, '10')
        browser.selectByVisibleText(assess.expirationYear, '2020')
        browser.setValue(assess.securityCode, '737')
        browser.click(assess.nextReviewOrder)
    })

    it('Place Order', function () {
        browser.waitForVisible(assess.placeOrder, 60000)
        var placeOrdeVisible = browser.isVisible(assess.placeOrder)
        assert.isTrue(placeOrdeVisible, 'Place Order page is displayed')
        browser.click(assess.placeOrder)
    })

    it('Thank you for your Order', function () {
        browser.waitForVisible(assess.thankYouOrderMsg, 60000)
        var message = browser.getText(assess.thankYouOrderMsg)
        assert.equal(message, 'You will receive an email confirmation shortly at automation '+ uniqueNum + '@yopmail.com', 'Thanks you for your order message is displayed')
    })
});