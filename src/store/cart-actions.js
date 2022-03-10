import { showNotification } from "./ui-slice";
import { replaceCart } from "./cart-slice";

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://redux-practise-230a1-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
		};

		// try {
		// 	await sendRequest();
		dispatch(
			showNotification({
				status: "success",
				title: "Success!",
				message: "Sending cart data successfully!",
			})
		);
		// } catch (error) {
		sendRequest().catch((err) => {
			dispatch(
				showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed",
				})
			);
		});
		// }
	};
};

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://redux-practise-230a1-default-rtdb.firebaseio.com/cart.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch cart data!");
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
		} catch (error) {
			dispatch(
				showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed",
				})
			);
		}
	};
};
