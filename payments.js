const TEST_URL = 'https://pay-test-product-wizardry.herokuapp.com/';
const TEST_KEY = 'pk_test_0OsfHRsLfcxNI4s14kndJVBk';

const LIVE_URL = 'https://pay-product-wizardry.herokuapp.com/';
const LIVE_KEY = 'pk_live_aEU3c4O6gb4mgQMzsY8K0XB1';

const isLocal = window.location.href.includes('//localhost');

const url = isLocal ? TEST_URL : LIVE_URL;
const paymentForm = document.getElementById('paymentForm');
paymentForm.setAttribute('action', url);

const getAmountWithFee = ({amount, flatFeeInCents = true}) => {
  const PERCENT_FEE = .029;
  const FLAT_FEE = flatFeeInCents ? 30 : 0.30;
  const amountWithFee = 1 / (1 - PERCENT_FEE) * (amount + FLAT_FEE);
  const roundedAmountWithFee = Number(amountWithFee.toFixed(2));
  return roundedAmountWithFee;
};

const shownInputs = document.getElementById('inputs');
const amountInput = shownInputs.querySelector('[name="amount"]');
const descriptionInput = shownInputs.querySelector('[name="description"]');
const coverFeeInput = shownInputs.querySelector('[name="coverStripeFee"]');

const getAmountAndDescription = () => {
  const originalAmount = Number(amountInput.value);
  const amountInCents = originalAmount * 100;
  const description = descriptionInput.value;
  const isCoveringFee = coverFeeInput.checked;

  const amount = Math.floor(isCoveringFee
    ? getAmountWithFee({amount: amountInCents, flatFeeInCents: true})
    : amountInCents
  );

  const amountInDollars = (isCoveringFee
    ? getAmountWithFee({amount: originalAmount, flatFeeInCents: false})
    : originalAmount
  );

  return {
    amount,
    amountInDollars,
    description,
  };
};

const hiddenAmountInput = paymentForm.querySelector('[name="amount"]');
const hiddenDescriptionInput = paymentForm.querySelector('[name="description"]');
const stripeScriptContainer = paymentForm.querySelector('#stripeScriptContainer');

const setHiddenValues = ({amount, description}) => {
  hiddenAmountInput.setAttribute('value', amount);
  hiddenDescriptionInput.setAttribute('value', amount);
};

const createPaymentButton = () => {
  const key = isLocal ? TEST_KEY : LIVE_KEY;
  const imageUrl = 'https://stripe.com/img/documentation/checkout/marketplace.png';
  const {amount, amountInDollars, description} = getAmountAndDescription();
  const labelText = `Pay with Card: $${amountInDollars} for ${description}`;
  setHiddenValues({amount, description});

  const newScript = document.createElement('script');
  newScript.classList.add('stripe-button');
  newScript.setAttribute('src', 'https://checkout.stripe.com/checkout.js');
  newScript.setAttribute('data-key', key);
  newScript.setAttribute('data-name', 'Product Wizardry');
  newScript.setAttribute('data-amount', amount);
  newScript.setAttribute('data-description', description);
  newScript.setAttribute('data-image', imageUrl);
  newScript.setAttribute('data-locale', 'usd');
  newScript.setAttribute('data-zip-code', 'true');
  newScript.setAttribute('data-label', labelText);

  stripeScriptContainer.append(newScript);
}

document.getElementById('createScript').addEventListener('click', createPaymentButton);
