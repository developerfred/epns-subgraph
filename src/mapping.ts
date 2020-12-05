import { BigInt } from "@graphprotocol/graph-ts"
import {
  EPNSCore,
  AddChannel,
  DeactivateChannel,
  Donation,
  InterestClaimed,
  PublicKeyRegistered,
  SendNotification,
  Subscribe,
  Unsubscribe,
  UpdateChannel,
  Withdrawal
} from "../generated/EPNSCore/EPNSCore"
import { ExampleEntity } from "../generated/schema"

export function handleAddChannel(event: AddChannel): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.channel = event.params.channel
  entity.channelType = event.params.channelType

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.REFERRAL_CODE(...)
  // - contract.aDaiAddress(...)
  // - contract.calcAllChannelsRatio(...)
  // - contract.calcSingleChannelEarnRatio(...)
  // - contract.channels(...)
  // - contract.channelsCount(...)
  // - contract.claimFairShare(...)
  // - contract.daiAddress(...)
  // - contract.getChannelFSRatio(...)
  // - contract.getChannelSubscriberAddress(...)
  // - contract.getChannelSubscriberUserID(...)
  // - contract.getSubscriberFSRatio(...)
  // - contract.getWalletFromPublicKey(...)
  // - contract.governance(...)
  // - contract.groupFairShareCount(...)
  // - contract.groupHistoricalZ(...)
  // - contract.groupLastUpdate(...)
  // - contract.groupNormalizedWeight(...)
  // - contract.initialize(...)
  // - contract.lendingPoolProviderAddress(...)
  // - contract.mapAddressChannels(...)
  // - contract.mapAddressUsers(...)
  // - contract.memberExists(...)
  // - contract.ownerDaiFunds(...)
  // - contract.poolFunds(...)
  // - contract.unsubscribe(...)
  // - contract.users(...)
  // - contract.usersCount(...)
  // - contract.usersInterestClaimed(...)
  // - contract.usersInterestInWallet(...)
}

export function handleDeactivateChannel(event: DeactivateChannel): void {}

export function handleDonation(event: Donation): void {}

export function handleInterestClaimed(event: InterestClaimed): void {}

export function handlePublicKeyRegistered(event: PublicKeyRegistered): void {}

export function handleSendNotification(event: SendNotification): void {}

export function handleSubscribe(event: Subscribe): void {}

export function handleUnsubscribe(event: Unsubscribe): void {}

export function handleUpdateChannel(event: UpdateChannel): void {}

export function handleWithdrawal(event: Withdrawal): void {}
