import { BigInt } from "@graphprotocol/graph-ts"
import {
  EPNSCore,
  AddChannel as AddChannelEvent,
  DeactivateChannel as DeactivateChannelEvent,
  Donation as DonationEvent,
  InterestClaimed as InterestClaimedEvent,
  PublicKeyRegistered as PublicKeyRegisteredEvent,
  SendNotification as SendNotificationEvent,
  Subscribe as SubscribeEvent,
  Unsubscribe as UnsubscribeEvent,
  UpdateChannel as UpdateChannelEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/EPNSCore/EPNSCore"
import {
  Upgraded as UpgradedEvent,
  AdminChanged as AdminChangedEvent,
} from "../generated/EPNSProxy/EPNSProxy"
import { 
  AddChannel,
  DeactivateChannel,
  Donation,
  InterestClaimed,
  PublicKeyRegistered,
  SendNotification,
  Subscribe,
  Unsubscribe,
  UpdateChannel,
  Withdrawal,
  Upgraded,
  AdminChanged
   } from "../generated/schema"

export function handleAddChannel(event: AddChannelEvent): void {

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = new AddChannel(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new AddChannel(event.transaction.from.toHex())

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

export function handleDeactivateChannel(event: DeactivateChannelEvent): void {
  let entity = new DeactivateChannel(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.channel = event.params.channel
  entity.save()
}

export function handleDonation(event: DonationEvent): void {
  let entity = new Donation(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.donator = event.params.donator
  entity.amt = event.params.amt
  entity.save()
}

export function handleInterestClaimed(event: InterestClaimedEvent): void {
  let entity = new InterestClaimed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.save()
}

export function handlePublicKeyRegistered(event: PublicKeyRegisteredEvent): void {
  let entity = new PublicKeyRegistered(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.publickeyy = event.params.publickey
  entity.save()
}

export function handleSendNotification(event: SendNotificationEvent): void {
  let entity = new SendNotification(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.channel = event.params.channel
  entity.recipient = event.params.recipient
  entity.identity = event.params.identity
  entity.save()
}

export function handleSubscribe(event: SubscribeEvent): void {
  let entity = new Subscribe(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.channel = event.params.channel
  entity.user = event.params.user
  entity.save()
}

export function handleUnsubscribe(event: UnsubscribeEvent): void {
  let entity = new Unsubscribe(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.channel = event.params.channel
  entity.user = event.params.user
  entity.save()
}

export function handleUpdateChannel(event: UpdateChannelEvent): void {
  let entity = new UpdateChannel(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.channel = event.params.channel
  entity.identity = event.params.identity
  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.to = event.params.to
  entity.token = event.params.token
  entity.amount = event.params.amount
  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.implementation = event.params.implementation
  entity.save()
}

export function handleAdminChanged (event: AdminChangedEvent ): void {
  let entity = new AdminChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  entity.newAdmin = event.params.newAdmin
  entity.previousAdmin = event.params.previousAdmin
  entity.save()
}