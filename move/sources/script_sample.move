script {
  use std::signer;
  use std::vector;

  use aptos_framework::coin;
  use aptos_framework::aptos_account;
 
  // fun transfer_half_single<Coin>(caller: &signer, receiver_address: address, amount: u64) {
  //   let caller_address: address = signer::address_of(caller);
  //   let balance: u64 = coin::balance<Coin>(caller_address);
 
  //   let half = amount / 2;
  //   aptos_account::transfer_coins<Coin>(caller, receiver_address, half);
  // }

  // fun transfer_half_multiple_same_amount<Coin>(caller: &signer, receivers: vector<address>, amount: u64) {
  //   let caller_address: address = signer::address_of(caller);
  //   // let balance: u64 = coin::balance<Coin>(caller_address);
  //   let len = vector::length(&receivers);
    
  //   let half = amount / 2;
    
  //   let i = 0;
  //   while (i < len) {
  //     let receiver = *vector::borrow(&receivers, i);
  //     // let amount = *vector::borrow(&amounts, i);
  //     aptos_account::transfer_coins<Coin>(caller, receiver, half);
  //     i = i + 1;
  //   };
  // }

  fun transfer_half_multiple_different_amount<Coin>(caller: &signer, receivers: vector<address>, amounts: vector<u64>) {
    let caller_address: address = signer::address_of(caller);
    // let balance: u64 = coin::balance<Coin>(caller_address);
    let len = vector::length(&receivers);
    
    
    let i = 0;
    while (i < len) {
      let receiver = *vector::borrow(&receivers, i);
      let amount = *vector::borrow(&amounts, i);
      let half = amount / 2;

      aptos_account::transfer_coins<Coin>(caller, receiver, half);
      i = i + 1;
    };
  }
}