import { Property } from "csstype";

export type TimeFormat =
  | "full"
  | "short"
  | "twentyFourHourTimeWithMS"
  | "withoutPm"
  | "withoutSeconds";
export type DateFormat =
  | "monthsAndDays"
  | "full"
  | "fullReverse"
  | "fullComma"
  | "withWeekday"
  | "dayOfYear";
export type DateTimeLocation = "local" | "market";
export type NumberAbbreviation =
  | "hundred" // QTY/100
  | "thousand" // "k"
  | "million" // "M"
  | "billion" // "B"
  | "dynamic" // Dynamic -- automatic variable choice per row to result in max 3 digits -- 1,412 -> 1.41K, 12.3 -> 12.3
  | "none";
export type UnitDisplay = "percentage" | "currency" | "none";
export type NumberFormatLocale = "system" | "none";

/**
 * Styling options, largely based on CSS specifications.
 * See MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
 */
export type DisplayStyles = {
  /**
   * Fontface parameters
   */
  font?: {
    family?: Property.FontFamily; // "Roboto"
    size?: Property.FontSize; // 11px, 1rem, etc
    weight?: Property.FontWeight; // bold
    style?: Property.FontStyle; // italic
  };
  /**
   * Text block parameters
   */
  text?: {
    /**
     * CSS color restricted to #HEX string
     */
    color?: Property.Color;
    decoration?: "underline" | "line-through"; // 'underline'
    align?: "start" | "end" | "left" | "right" | "center" | "justify";
    transform?: "capitalize" | "uppercase" | "lowercase" | "none"; // capitalize
  };
  /**
   * Table background
   */
  background?: {
    /**
     * CSS color restricted to #HEX string
     */
    color?: Property.Color;
  };
  /**
   * Row background
   */
  rowBackground?: {
    /**
     * CSS color for odd rows restricted to #HEX string
     */
    oddRow?: Property.Color;
    /**
     * CSS color for even rows restricted to #HEX string
     */
    evenRow?: Property.Color;
  };
  /**
   * Styling for cells
   */
  cellStyles?: {
    /**
     * Padding of the cell around the data shown in pixels
     */
    padding?: number;
    /**
     * Choice of cell border rendering density, used to achieve
     * "rows-only" or "columns-only" appearance
     */
    border?: "verticalAndHorizontal" | "vertical" | "horizontal" | "none";
    /**
     * CSS color for cell borders restricted to #HEX string
     */
    borderColor?: Property.Color;
  };
};

export type NumericUnit = "percent" | "volume" | "price" | "rank" | "quantity";
export type StringUnit = "symbol" | "name" | "account" | "position";
export type ConcreteUnit = NumericUnit | StringUnit;

/**
 * A semantic category of raw value extending the the {@link ConcreteUnit}
 * options provided by Language Services. This is used to identify the range
 * of customizations offered for that data.
 */
export type DisplayConditionUnitType =
  | "number"
  | "timestamp"
  | "string"
  | ConcreteUnit;

/**
 * 'noop' is a special condition used to define the "default" state
 * for displaying values. It means — when no other condition has matched
 * use the display settings conditioned as 'noop'. It does not imply lack
 * of customization.
 */
export type NoopCondition = { type: "noop" };

/**
 * Known conditions for enabling customizations for a particular subset of data.
 */
export type DisplaySettingsCondition =
  | NoopCondition
  | { type: "custom"; customConditionFunction: string }
  | { type: "greaterThan"; comparedTo: number }
  | { type: "lessThan"; comparedTo: number }
  | { type: "matchesUnit"; unitType: DisplayConditionUnitType }
  | { type: "matchesValue"; matchesValue: string }
  | { type: "negative" }
  | { type: "numberEquals"; comparedTo: number }
  | { type: "percentNegative" }
  | { type: "percentPositive" }
  | { type: "positive" }
  | { type: "zero" }
  | {
      type: "hasColumnDependency";
      dependentColumnId: string;
      dependentCondition: DisplaySettingsCondition;
    };

/**
 * Settings concerning the display of a value, at the scope that these
 * settings are defined (grid, row, column, etc.)
 */
export interface DisplaySettings {
  /**
   * The triggering conditions, causing these settings to be applied.
   */
  condition: DisplaySettingsCondition;
  id: string;
  styles: DisplayStyles;
  formatting: FormattingSettings;
}

/**
 * Configuration for the formatting (as opposed to styling) of the data
 * shown in the table.
 *
 * This object can contain a key for each underlying value type, in a generalized
 * form (e.g. 'number' as a generalization of 'int' or 'double') and that key
 * will contain the formatting options available to that value type.
 *
 * For timestamp values this accommodates separate configuration of the
 * 'date' and 'time' components. For example 'date.isHidden' can be set to
 * limit the display of the timestamp value to the 'time' component.
 *
 * Additionally it has a {@link dateTimeLocation} which applies to 'date' and 'time'
 * values.
 *
 * When this object is defined at Grid scope, we can set multiple keys to define
 * formatting for the entire grid, covering the entire variety of value types
 * that may appear in it.
 *
 * When defined at the Column scope, this object should only contain one of the keys
 * aligned with that Column's expected dataType and unit. Any other data will be discarded.
 */
export type FormattingSettings = Partial<{
  /**
   * Formatting settings for numbers.
   */
  number: Partial<{
    /**
     * Number of decimal places to show.
     */
    decimalAmount: {
      max: number;
      min: number;
    };
    /**
     * Locale for the display of numeric values, stylistically changing
     * their appearance.
     */
    locale: NumberFormatLocale;
    /**
     * Options for display of unit annotation on numeric values.
     */
    unitDisplay: UnitDisplay;
    /**
     * Directions for abbreviating numeric values, for example by collapsing
     * powers of 10.
     */
    abbreviationType: NumberAbbreviation;
    /**
     * Whether the abbreviation annotation symbol will be shown.
     */
    showAbbreviationSymbol: boolean;
  }>;
  /**
   * Formatting settings units of time, or time component of a timestamp.
   */
  time: Partial<{
    /**
     * Formatting choice for time.
     */
    format?: TimeFormat;
    /**
     * If this is a time component of a timestamp value, don't show it.
     */
    isHidden?: boolean;
  }>;
  /**
   * Formatting settings for date or the date component of a timestamp.
   */
  date: Partial<{
    /**
     * Formatting choice for the date.
     */
    format?: DateFormat;
    /**
     * If this is a date component of a timestamp value, don't show it.
     */
    isHidden?: boolean;
  }>;
  /**
   * Offset specification, used to inidcate the niche significance of
   * a date-time value.
   */
  dateTimeLocation: DateTimeLocation;
}>;
