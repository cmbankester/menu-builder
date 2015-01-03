# Phase 1

- [Create new rules](#rule)
- [Associate foods with categories](#category)
- [I have eaten...](#eaten)

<a name="rule"></a>
## Create new rules

Allows the user to enter new rules for the types of food to be eaten and the frequency those foods should be eaten.

![Create food rule](https://bytebucket.org/beard-jason/menu-builder-hapi/raw/e84a2dacf3632a9e1f9153f7be2d3fb6d2e641d5/planning/mockup-create-rule.png?token=6e1cc34c7c4cc4d524f18c36e67fdbeacb796ce3)

Fields:

* Food (or category) name
* Occurence - Dropdown
  * At least
  * At most
  * Exactly
* Unit - Dropdown
  * oz
  * lb
  * piece
  * ...others?
* Time
  * day
  * week
  * month

<a name="category"></a>
## Associate foods with categories

Allows the user to associate a food to 1 or more categories. For instance, one could add hamburger into a red meat category.

![Associate food with category](https://bytebucket.org/beard-jason/menu-builder-hapi/raw/44965129a900d63e5ef60d6f14259243a2e5d3ba/planning/mockup-food-category.png?token=740821bad153fb5b3e53f89741dd921274a38d85)

Fields

* Food
* Category(ies) - String, acts like tags

<a name="eaten"></a>
## I have eaten...

Allows the user to report back to the system with what was eaten on a given day, allowing the system to chart progress and how successful the user has been with meeting goal rules.

Fields:

* Date (default to today)
* Food - Dropdown, driven by rules created for food/category
  * Food name
  * Category name
* Quantity - Number
