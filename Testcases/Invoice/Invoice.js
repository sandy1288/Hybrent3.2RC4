describe('Hybrent Invoice Module', function () {
  var EC = protractor.ExpectedConditions;
  var PO_Num = browser.params.itemCatalog.PO_Number;
  var randNumber = browser.params.itemCatalog.randNumber;

  it('Navigate to Invoice module', function () {
    element(by.xpath('//span[contains(text(),"Invoices")]')).click();
    browser.wait(EC.invisibilityOf($('.pg-loading-center-middle')), 20000);
    expect(browser.getTitle()).toEqual('Manage Invoice');
    browser.sleep(1000);
  });

  it('verify that all search filter and drop down should appear on invoice listing page', function () {
    expect(element(by.model('searchParams.search')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.vendor_id')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.status')).isPresent()).toBe(true);
    expect(element(by.model('$select.search')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.due_date_range')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.department_id')).isPresent()).toBe(true);
    expect(element(by.model('$ctrl.selectedValue.name')).isPresent()).toBe(true);
    expect(element(by.model('searchParams.project_id')).isPresent()).toBe(true);

  });

  it('Verify that user is able to search invoice by invoice number', function () {
    element(by.model('searchParams.search')).clear().sendKeys('TEST' + randNumber);
    browser.sleep(1000);
    element(by.buttonText('Search')).click();
    browser.sleep(2000);
    element(by.repeater('item in items track by item.id')).getText().then(function (test) {
      expect(test).toContain('TEST' + randNumber);
    });

  });

  it('Open invoice detail page', function () {
    element(by.linkText('TEST' + randNumber)).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Invoice Detail');
  });

  it('update invoice', function () {
    browser.sleep(2000);
    element(by.model('vm.InvTaxAmount')).clear().sendKeys('10.00');
    element(by.model('vm.InvFreightCharges')).clear().sendKeys('10.00');
    element(by.model('vm.InvMiscCharges')).clear().sendKeys('10.00');
    element(by.model('vm.InvDiscountAmount')).clear().sendKeys('10.00');
    element(by.xpath('//span[contains(@class,"pull-right")]')).getText().then(function (test) {
      expect(test).toEqual('$68.00');
    })
    element(by.buttonText('Save')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Invoice saved successfully.');
  });

  it('delete newly created invoice', function () {
    browser.sleep(2000);
    element(by.xpath('//i[contains(@class,"glyphicon glyphicon-trash text-danger action-button")]')).click();
    browser.sleep(2000);
    element(by.css('.sa-button-container')).element(by.buttonText('Yes')).click();
    expect($('.toast-message').getText()).toEqual('Invoice deleted successfully.');
  })

});