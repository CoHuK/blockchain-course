import { useState, useEffect } from "react";
import ItemManager from "../../contracts/ItemManager.json";
import Item from "../../contracts/Item.json";
import Web3 from "web3";

function ContractUser() {
    const[state, setState] = useState({cost: 0, itemName: "exampleItem1", loaded:false, accounts: [], item: ""});
    console.log("Initiate state");
    console.log(state);

    const componentDidMount = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            // Use web3 to get the user's accounts.
            const _accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const _networkId = await web3.eth.net.getId();

            const _itemManager = new web3.eth.Contract(
                ItemManager.abi,
                ItemManager.networks[_networkId] && ItemManager.networks[_networkId].address,
            );
            const _item = new web3.eth.Contract(
                Item.abi,
                Item.networks[_networkId] && Item.networks[_networkId].address,
            );
            console.log("Try to set state.loaded = true");
            setState({...state, loaded:true, accounts:_accounts, item: _item, itemManager: _itemManager});
            console.log(state);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.log(state);
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        const { cost, itemName, accounts, itemManager } = state;
        console.log("Submit handling");
        console.log(itemName, cost, itemManager);
        let result = await state.itemManager.methods.createItem(itemName, cost).send({ from: accounts[0] });
        console.log("Result:");
        console.log(result);
        console.log("Try to sent alert:");
        alert("Send "+cost+" Wei to "+result.events.SupplyChainStep.returnValues._address);
        listenToPaymentEvent();
      };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({...state, [name]:value});
        console.log(state);
    }

    const listenToPaymentEvent = () => {
        console.log("Item manager " + state.itemManager)
        if(state.itemManager) {
            console.log("Listening to events");
            console.log(state.itemManager.events.SupplyChainStep());
            console.log("ItemManager exists!");
            state.itemManager.events.SupplyChainStep().on("data", async function(evt) {
                console.log('Event triggered!!!!');
                if(evt.returnValues._step === "1") {
                    let item = await state.itemManager.methods.items(evt.returnValues._itemIndex).call();
                    console.log(item);

                    console.log("Try to sent alert about payment:");
                    alert("Item " + item._identifier + " was paid, deliver it now!");
                };
                console.log(evt);
            });
        };
    }

    useEffect(() => {
        componentDidMount()
        // listenToPaymentEvent();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    if (!state.loaded) {
        console.log(state);
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div className="App">
          <h1>Simply Payment/Supply Chain Example!</h1>
          <h2>Items</h2>

          <h2>Add Element</h2>
          Cost: <input type="text" name="cost" value={state.cost} onChange={handleInputChange} />
          Item Name: <input type="text" name="itemName" value={state.itemName} onChange={handleInputChange} />
          <button type="button" onClick={handleSubmit}>Create new Item</button>
        </div>
      );
}

export default ContractUser;
