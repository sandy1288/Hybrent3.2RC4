describe('Hybrent Cart Module', function () {
  var EC = protractor.ExpectedConditions;
  var General_mfrNumber = browser.params.itemCatalog.General_mfrNumber;
  var randNumber = browser.params.itemCatalog.randNumber;
  var PO_Num = browser.params.itemCatalog.PO_Number;

  it('Open cart page', function () {
    element(by.css('.fa-shopping-cart')).click();
    expect(browser.getTitle()).toEqual('My Cart');
  });

  it('add item to cart', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBeTruthy();
    element(by.model('searchParams.search')).sendKeys(General_mfrNumber + randNumber);
    expect(element(by.buttonText('+')).isPresent()).toBe(true);
    element(by.buttonText('+')).click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    browser.sleep(2000);
    element(by.buttonText('+')).click();
    browser.sleep(2000);
    expect(element(by.css('.item-qty-editable-label')).getText()).toEqual('4');
  });

  it('Generate PO', function () {
    var receive_only = element(by.model('cartParams.vendorParams[key].is_receive_only'));
    receive_only.click();
    browser.sleep(1000);
    element(by.model('cartParams.vendorParams[key].is_use_my_po_num')).click();
    browser.sleep(1000);
    element(by.model('cartParams.vendorParams[key].manual_po_num')).sendKeys(PO_Num + randNumber);
    browser.sleep(3000);
    element(by.xpath('//span[@id="btnAdd"]')).click();
    browser.sleep(1000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    browser.sleep(2000);
    var budget = element(by.css('.sa-button-container'));
    budget.isPresent().then(function (present) {
      if (present) {
        console.log('Budget is present for corresponding facility');
        element(by.buttonText('Yes')).click();
      } else {
        console.log('Budget is not present for corresponding facility');
      }

    });

    expect($('.toast-message').getText()).toContain('PO(' + PO_Num + randNumber + ') created successfully.');

  });





});