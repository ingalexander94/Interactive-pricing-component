(() => {
  const d = document,
    $range = d.getElementById("range"),
    $discount = d.getElementById("menthual"),
    $price = d.querySelector(".form__top_price span"),
    $timer = d.querySelector(".form__top_price div"),
    $pageviews = d.querySelector(".form__top_pages");

  const prices = [8, 12, 16, 24, 36];

  let state = {
    price: 8,
    isChecked: false,
    pageviews: "10K",
    timer: "/ month",
  };

  const getPageviews = (price) => {
    switch (price) {
      case 1:
        return "10K";
      case 2:
        return "50K";
      case 3:
        return "100K";
      case 4:
        return "500K";
      case 5:
        return "1M";
      default:
        return state.pageviews;
    }
  };

  const setState = (newState) => {
    state = { ...newState };
    updateTemplate();
  };

  const updateTemplate = () => {
    const progress = prices.indexOf(state.price) * 25;
    $range.style.background = `linear-gradient(to right,var(--Soft-Cyan) 0%,var(--Soft-Cyan) ${progress}%,var(--Light-Grayish-Blue) ${progress}%,var(--Light-Grayish-Blue) 100%)`;
    const showPrice = state.isChecked
      ? state.price - (state.price * 25) / 100
      : state.price;
    $timer.innerHTML = state.timer;
    $price.textContent = `$${showPrice}.00`;
    $pageviews.textContent = `${state.pageviews} Pageviews`;
  };

  $range.addEventListener("change", ({ target: { value } }) => {
    const price = prices[value - 1];
    setState({
      ...state,
      price,
      pageviews: getPageviews(parseInt(value)),
    });
  });

  $discount.addEventListener("change", ({ target: { checked } }) => {
    const timer = checked ? "/ year" : "/ month";
    setState({
      ...state,
      isChecked: checked,
      timer,
    });
  });

  document.addEventListener("DOMContentLoaded", updateTemplate);
})();
