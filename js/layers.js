addLayer("s", {
    name: "Scion", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fccd12",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "attempts", // Name of prestige currency
    baseResource: "seconds to save the world", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    prestigeButtonText() {
        return "Reset: Try another path"
    },
    getResetGain() {
        return new Decimal(1)
    },
    getNextAt(canMax=false) {
        return new Decimal(10000)
    },
    canReset() {
        return true
    },
    onPrestige(gain) {
        player["m"].bagObtained = false
        player["m"].thinking = false
        player["m"].sleeping = false
        player["m"].mixed1 = false
        player["m"].mixed2 = false
        player["m"].mixed3 = false
        player["m"].greenLiquidDrunk = false
        player["m"].whitePowderUsed = false
        player["m"].houseLeft = false
        player["m"].concotion1used = false
        player["m"].concotion2used = false
        player["m"].concotion3used = false
        player["m"].concotion1wasted = false
        player["m"].concotion2wasted = false
        player["m"].concotion3wasted = false
        return
    },
    prestigeNotify() {
        return false
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "s", description: "S: ???", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    infoboxes: {
        lore: {
            title: "Failure",
            body() { return "Failure is inevitable; with so many branching paths, it's inevitable that you eventually take the wrong one. However, trying again is simple, and you can learn from your mistakes."}
        }
    }
})

addLayer("m", {
    name: "Memory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(120),
    }},
    color: "#f2aeb1",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "memories", // Name of prestige currency
    baseResource: "seconds to save the world", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    prestigeButtonText() {
        return "Button Not Needed?"
    },
    getResetGain() {
        return new Decimal(1)
    },
    getNextAt(canMax=false) {
        return new Decimal(10000)
    },
    canReset() {
        return false
    },
    onPrestige(gain) {
        return
    },
    prestigeNotify() {
        return false
    },
    passiveGeneration() {
        let gen = new Decimal(-5)
        if (player[this.layer].thinking) {
            gen = new Decimal(-1)
        }
        if (player[this.layer].sleeping) {
            gen = new Decimal(0)
        }
        return gen
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        // {key: "m", description: "M: ???", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    topsection: [
        ['display-text', function() {
            return "<h2>MAINTENANCE</h2><br><br>\n\
            Life sund and explore...and with a little luck, finally repair the life support systems."
        }]
    ],
    infoboxes: {
        lore: {
            title: "The Beginning",
            body() { return "You wake up with visions of beings beyond your comprehensions. The memory of these visions is rapidly fading. You feel the urgent need to remember, that if these memories fade something terrible will happen. Your uncle stares at you from across the room, he looks terrified."}
        }
    },
    upgrades: {
        11: {
            title: "Stop thinking",
            description: "You're not sure how this would help.",
            cost: new Decimal(20),
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].thinking = true
            }
        },
        12: {
            title: "Lay back down",
            description: "Seems kind of like giving up.",
            cost: new Decimal(20),
            unlocked() {
                if (!player[this.layer].houseLeft) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        13: {
            title: "Explain everything",
            description: "They deserve to know.",
            cost: new Decimal(20),
            unlocked() {
                if (!player[this.layer].houseLeft) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
            }
        },
        14: {
            title: "Leave the house",
            description: "There might be more to do outside.",
            cost: new Decimal(20),
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].houseLeft = true
            }
        },
        15: {
            title: "Steal the medicine bag",
            description: "There could be something useful in there.",
            cost: new Decimal(20),
            unlocked() {
                if (!player[this.layer].houseLeft || player[this.layer].bagObtained) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].bagObtained = true
            }
        },
        21: {
            title: "Mix white powder with green liquid",
            description: "You might be able to use this mixture for something.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].bagObtained 
                    && !player[this.layer].whitePowderUsed 
                    && !player[this.layer].greenLiquidDrunk
                    && !player[this.layer].mixed2
                    && !player[this.layer].mixed3) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].mixed1 = true
            }
        },
        22: {
            title: "Mix green liquid with orange powder",
            description: "You might be able to use this mixture for something.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].bagObtained 
                    && !player[this.layer].greenLiquidDrunk
                    && !player[this.layer].mixed1
                    && !player[this.layer].mixed3) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].mixed2 = true
            }
        },
        23: {
            title: "Mix orange powder with white powder",
            description: "You might be able to use this mixture for something.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].bagObtained 
                    && !player[this.layer].whitePowderUsed
                    && !player[this.layer].mixed1
                    && !player[this.layer].mixed2) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].mixed3 = true
            }
        },
        24: {
            title: "Drink the green liquid",
            description: "Looks kind of gross.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].bagObtained 
                    && !player[this.layer].mixed1 
                    && !player[this.layer].mixed2) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].greenLiquidDrunk = true
            }
        },
        25: {
            title: "Snort the white powder",
            description: "Maybe it's not what it looks like.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].bagObtained 
                    && !player[this.layer].mixed1 
                    && !player[this.layer].mixed3) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].whitePowderUsed = true
            }
        },
        31: {
            title: "Consume your concoction",
            description: "Looks really gross.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].mixed1
                    && !player[this.layer].concotion1wasted) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].sleeping = true
                player[this.layer].concotion1used = true
            }
        },
        32: {
            title: "Consume your concoction",
            description: "Looks really gross.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].mixed2
                    && !player[this.layer].concotion2wasted) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].concotion2used = true
            }
        },
        33: {
            title: "Consume your concoction",
            description: "Looks really gross.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].mixed3
                    && !player[this.layer].concotion3wasted) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].concotion3used = true
            }
        },
        34: {
            title: "Convince your uncle to drink it",
            description: "You're not sure how you'll do this, but you will.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].mixed1
                    && !player[this.layer].concotion1used) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].concotion1wasted = true
            }
        },
        35: {
            title: "Convince your uncle to drink it",
            description: "You're not sure how you'll do this, but you will.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].mixed2
                    && !player[this.layer].concotion2used) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].concotion2wasted = true
            }
        },
        36: {
            title: "Convince your uncle to drink it",
            description: "You're not sure how you'll do this, but you will.",
            cost: new Decimal(20),
            unlocked() {
                if (player[this.layer].mixed3
                    && !player[this.layer].concotion3used) {
                    return true
                } else {
                    return false
                }
            },
            onPurchase() {
                player.points = player.points.add(-20)
                player[this.layer].concotion3wasted = true
            }
        },
    }
})
