Dokumentacija za DYN UI implementaciju

# <a id="_Toc209713907"></a>Sadr┼╛aj

[Sadr┼╛aj	1](#_Toc209713907)

[Dokumentacija za DYN UI implementaciju \- Grupa 1: Osnovne komponente	4](#_Toc209713908)

[DYNButton \- Implementacija u React/TypeScript	4](#_Toc209713909)

[Angular interface:	4](#_Toc209713910)

[React/TypeScript implementacija:	4](#_Toc209713911)

[\.NET Core API modeli za Button	6](#_Toc209713912)

[Entity Framework modeli	7](#_Toc209713913)

[API Controller za Button	8](#_Toc209713914)

[Microservice implementacija	9](#_Toc209713915)

[CSS stilovi \(dyn\-button\.scss\)	11](#_Toc209713916)

[Grupa 2: Display komponente \(Badge, Avatar, Icon, Label\)	14](#_Toc209713917)

[DYNBadge \- Implementacija u React/TypeScript	14](#_Toc209713918)

[Angular interface:	14](#_Toc209713919)

[React/TypeScript implementacija:	14](#_Toc209713920)

[DYNAvatar \- Implementacija u React/TypeScript	17](#_Toc209713921)

[DYNIcon \- Implementacija u React/TypeScript	19](#_Toc209713922)

[DYNLabel \- Implementacija u React/TypeScript	20](#_Toc209713923)

[\.NET Core modeli za Display komponente	22](#_Toc209713924)

[Entity Framework modeli za komponente	23](#_Toc209713925)

[Microservice za Display komponente	24](#_Toc209713926)

[CSS stilovi za Display komponente	27](#_Toc209713927)

[Hook za ikone	31](#_Toc209713928)

[Grupa 3: Layout komponente \(Container, Divider, Grid, Page\)	32](#_Toc209713929)

[DYNContainer \- Implementacija u React/TypeScript	32](#_Toc209713930)

[Angular interface:	32](#_Toc209713931)

[React/TypeScript implementacija:	32](#_Toc209713932)

[DYNDivider \- Implementacija u React/TypeScript	34](#_Toc209713933)

[DYNGrid \- Implementacija u React/TypeScript	35](#_Toc209713934)

[DYNPage \- Implementacija u React/TypeScript	40](#_Toc209713935)

[\.NET Core modeli za Layout komponente	42](#_Toc209713936)

[Entity Framework modeli za Layout	44](#_Toc209713937)

[Microservice za Layout komponente	46](#_Toc209713938)

[CSS stilovi za Layout komponente	49](#_Toc209713939)

[Grupa 4: Interakcijske komponente \(Modal, Popup, Dropdown, Accordion\)	57](#_Toc209713940)

[DYNModal \- Implementacija u React/TypeScript	57](#_Toc209713941)

[Angular interface:	57](#_Toc209713942)

[React/TypeScript implementacija:	57](#_Toc209713943)

[DYNPopup \- Implementacija u React/TypeScript	61](#_Toc209713944)

[DYNDropdown \- Implementacija u React/TypeScript	67](#_Toc209713945)

[DYNAccordion \- Implementacija u React/TypeScript	70](#_Toc209713946)

[\.NET Core modeli za Interakcijske komponente	74](#_Toc209713947)

[Entity Framework modeli za Interakcijske komponente	76](#_Toc209713948)

[CSS stilovi za Interakcijske komponente	78](#_Toc209713949)

[Grupa 5: Form/Field komponente \(Input, Select, Checkbox, DatePicker, Upload\)	86](#_Toc209713950)

[Osnovna arhitektura Field sistema	86](#_Toc209713951)

[Bazni Field Interface:	86](#_Toc209713952)

[DYNInput \- Implementacija u React/TypeScript	87](#_Toc209713953)

[DYNSelect \- Implementacija u React/TypeScript	91](#_Toc209713954)

[DYNCheckbox \- Implementacija u React/TypeScript	97](#_Toc209713955)

[DYNDatePicker \- Implementacija u React/TypeScript	100](#_Toc209713956)

[DynFieldContainer \- Osnovni wrapper	105](#_Toc209713957)

[Validation Hook	106](#_Toc209713958)

[CSS stilovi za Field komponente	108](#_Toc209713959)

[Grupa 6: Navigation komponente \(Menu, Breadcrumb, Stepper, Tabs, Toolbar\)	117](#_Toc209713960)

[DYNMenu \- Implementacija u React/TypeScript	117](#_Toc209713961)

[Angular interface:	117](#_Toc209713962)

[React/TypeScript implementacija:	118](#_Toc209713963)

[DYNBreadcrumb \- Implementacija u React/TypeScript	124](#_Toc209713964)

[DYNStepper \- Implementa├º├úo em React/TypeScript	126](#_Toc209713965)

[DYNTabs \- Implementa├º├úo em React/TypeScript	129](#_Toc209713966)

[DYNToolbar \- Implementa├º├úo em React/TypeScript	131](#_Toc209713967)

[\.NET Core modeli za Navigation komponente	135](#_Toc209713968)

[CSS stilovi za Navigation komponente	138](#_Toc209713969)

[Grupa 7: Data Display komponente \(Table, List View, Chart, Gauge, Tree View\)	151](#_Toc209713970)

[DYNTable \- Implementacija u React/TypeScript	151](#_Toc209713971)

[Angular interface:	151](#_Toc209713972)

[React/TypeScript implementacija:	151](#_Toc209713973)

[DYNList View \- Implementacija u React/TypeScript	161](#_Toc209713974)

[DYNChart \- Implementacija u React/TypeScript	166](#_Toc209713975)

[DYNGauge \- Implementacija u React/TypeScript	169](#_Toc209713976)

[DYNTree View \- Implementacija u React/TypeScript	173](#_Toc209713977)

[CSS stilovi za Data Display komponente	176](#_Toc209713978)

[Grupa 8: Feedback komponente \(Loading, Progress, Toast, Dialog\)	186](#_Toc209713979)

[DYNLoading \- Implementacija u React/TypeScript	186](#_Toc209713980)

[DYNProgress \- Implementacija u React/TypeScript	187](#_Toc209713981)

[DYNToast \- Implementacija u React/TypeScript	189](#_Toc209713982)

[DYNDialog \- Implementacija u React/TypeScript	192](#_Toc209713983)

[Grupa 9: Utility/Helper komponente \(Avatar, Badge, Divider, Icon, Tooltip\)	195](#_Toc209713984)

[DYNAvatar \- Implementacija u React/TypeScript	195](#_Toc209713985)

[DYNBadge \- Implementacija u React/TypeScript	196](#_Toc209713986)

[DYNIcon \- Implementacija u React/TypeScript	197](#_Toc209713987)

[DYNTooltip \- Implementacija u React/TypeScript	198](#_Toc209713988)

[CSS stilovi za Feedback i Utility komponente	201](#_Toc209713989)

[Glavni index fajl za sve komponente	208](#_Toc209713990)

[Package\.json primer	209](#_Toc209713991)

[≡ƒôè Statistike implementacije:	210](#_Toc209713992)

[≡ƒÄ» Klju─ìne komponente DYNgrupama:	211](#_Toc209713993)

[≡ƒÆí Tehni─ìka arhitektura:	211](#_Toc209713994)

## <a id="_Toc209713908"></a>Grupa 1: Osnovne komponente

### <a id="_Toc209713909"></a>DYNButton \- Implementacija u React/TypeScript

#### <a id="_Toc209713910"></a>Angular interface:

interface DynButtonProps \{

  label?: string;

  icon?: string | TemplateRef<void>;

  type?: 'button' | 'submit' | 'reset';

  loading?: boolean;

  danger?: boolean;

  kind?: 'primary' | 'secondary' | 'tertiary';

  disabled?: boolean;

  ariaLabel?: string;

  ariaExpanded?: boolean;

  size?: 'small' | 'medium' | 'large';

  onBlur?: \(\) => void;

  onClick?: \(\) => void;

\}

#### <a id="_Toc209713911"></a>React/TypeScript implementacija:

// types/button\.types\.ts

export type ButtonKind = 'primary' | 'secondary' | 'tertiary';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface DynButtonProps \{

  label?: string;

  icon?: string | React\.ReactNode;

  type?: ButtonType;

  loading?: boolean;

  danger?: boolean;

  kind?: ButtonKind;

  disabled?: boolean;

  ariaLabel?: string;

  ariaExpanded?: boolean;

  size?: ButtonSize;

  className?: string;

  onBlur?: \(\) => void;

  onClick?: \(\) => void;

\}

// components/DynButton\.tsx

import React, \{ forwardRef, useImperativeHandle, useRef \} from 'react';

import classNames from 'classnames';

import \{ DynButtonProps \} from '\.\./types/button\.types';

export interface DynButtonRef \{

  focus\(\): void;

\}

const DynButton = forwardRef<DynButtonRef, DynButtonProps>\(\(\{

  label,

  icon,

  type = 'button',

  loading = false,

  danger = false,

  kind = 'secondary',

  disabled = false,

  ariaLabel,

  ariaExpanded,

  size = 'medium',

  className,

  onBlur,

  onClick

\}, ref\) => \{

  const buttonRef = useRef<HTMLButtonElement>\(null\);

  useImperativeHandle\(ref, \(\) => \(\{

    focus\(\) \{

      if \(\!disabled\) \{

        buttonRef\.current?\.focus\(\);

      \}

    \}

  \}\)\);

  const handleClick = \(\) => \{

    if \(\!disabled && \!loading\) \{

      onClick?\.\(\);

    \}

  \};

  const buttonClasses = classNames\(

    'dyn\-button',

    \`dyn\-button\-$\{kind\}\`,

    \`dyn\-button\-$\{size\}\`,

    \{

      'dyn\-button\-danger': danger && kind \!== 'tertiary',

      'dyn\-button\-loading': loading,

      'dyn\-button\-disabled': disabled || loading,

      'dyn\-button\-icon\-only': icon && \!label

    \},

    className

  \);

  const renderIcon = \(\) => \{

    if \(loading\) \{

      return <span className="dyn\-button\-loading\-icon" />;

    \}

    if \(typeof icon === 'string'\) \{

      return <i className=\{\`dyn\-button\-icon $\{icon\}\`\} />;

    \}

    return icon ? <span className="dyn\-button\-custom\-icon">\{icon\}</span> : null;

  \};

  return \(

    <button

      ref=\{buttonRef\}

      type=\{type\}

      className=\{buttonClasses\}

      disabled=\{disabled || loading\}

      aria\-label=\{ariaLabel || label\}

      aria\-expanded=\{ariaExpanded\}

      onBlur=\{onBlur\}

      onClick=\{handleClick\}

    >

      \{renderIcon\(\)\}

      \{label && <span className="dyn\-button\-label">\{label\}</span>\}

    </button>

  \);

\}\);

DynButton\.displayName = 'DynButton';

export default DynButton;

### <a id="_Toc209713912"></a>\.NET Core API modeli za Button

// Models/UI/ButtonModels\.cs

using System\.ComponentModel\.DataAnnotations;

namespace DynUI\.Models\.UI

\{

    public enum ButtonKind

    \{

        Primary,

        Secondary,

        Tertiary

    \}

    public enum ButtonType

    \{

        Button,

        Submit,

        Reset

    \}

    public enum ButtonSize

    \{

        Small,

        Medium,

        Large

    \}

    public class ButtonConfigDto

    \{

        public string? Label \{ get; set; \}

        public string? Icon \{ get; set; \}

        public ButtonType Type \{ get; set; \} = ButtonType\.Button;

        public bool Loading \{ get; set; \} = false;

        public bool Danger \{ get; set; \} = false;

        public ButtonKind Kind \{ get; set; \} = ButtonKind\.Secondary;

        public bool Disabled \{ get; set; \} = false;

        public string? AriaLabel \{ get; set; \}

        public bool? AriaExpanded \{ get; set; \}

        public ButtonSize Size \{ get; set; \} = ButtonSize\.Medium;

        public string? Action \{ get; set; \}

        public Dictionary<string, object>? Parameters \{ get; set; \}

    \}

    public class ButtonActionRequest

    \{

        \[Required\]

        public string Action \{ get; set; \} = string\.Empty;

        public Dictionary<string, object>? Parameters \{ get; set; \}

        public string? Context \{ get; set; \}

    \}

\}

### <a id="_Toc209713913"></a>Entity Framework modeli

// Data/Entities/UIComponentEntity\.cs

using Microsoft\.EntityFrameworkCore;

namespace DynUI\.Data\.Entities

\{

    \[Index\(nameof\(ComponentType\), nameof\(PageId\)\)\]

    public class UIComponentEntity

    \{

        public int Id \{ get; set; \}

        public string ComponentType \{ get; set; \} = string\.Empty;

        public int? PageId \{ get; set; \}

        public string Configuration \{ get; set; \} = string\.Empty; // JSON

        public int Order \{ get; set; \}

        public bool IsActive \{ get; set; \} = true;

        public DateTime CreatedAt \{ get; set; \} = DateTime\.UtcNow;

        public DateTime? UpdatedAt \{ get; set; \}

        // Navigation properties

        public virtual PageEntity? Page \{ get; set; \}

    \}

    public class PageEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string Route \{ get; set; \} = string\.Empty;

        public string? Title \{ get; set; \}

        public bool IsActive \{ get; set; \} = true;

        // Navigation properties

        public virtual ICollection<UIComponentEntity> Components \{ get; set; \} = new List<UIComponentEntity>\(\);

    \}

\}

### <a id="_Toc209713914"></a>API Controller za Button

// Controllers/ButtonController\.cs

using Microsoft\.AspNetCore\.Mvc;

using DynUI\.Models\.UI;

using DynUI\.Services\.Interfaces;

namespace DynUI\.Controllers

\{

    \[ApiController\]

    \[Route\("api/v1/\[controller\]"\)\]

    public class ButtonController : ControllerBase

    \{

        private readonly IButtonService \_buttonService;

        private readonly ILogger<ButtonController> \_logger;

        public ButtonController\(IButtonService buttonService, ILogger<ButtonController> logger\)

        \{

            \_buttonService = buttonService;

            \_logger = logger;

        \}

        \[HttpPost\("action"\)\]

        public async Task<IActionResult> ExecuteAction\(\[FromBody\] ButtonActionRequest request\)

        \{

            try

            \{

                var result = await \_buttonService\.ExecuteActionAsync\(request\);

                return Ok\(result\);

            \}

            catch \(Exception ex\)

            \{

                \_logger\.LogError\(ex, "Error executing button action: \{Action\}", request\.Action\);

                return BadRequest\(new \{ error = ex\.Message \}\);

            \}

        \}

        \[HttpGet\("config/\{pageId\}"\)\]

        public async Task<IActionResult> GetButtonConfigs\(int pageId\)

        \{

            var configs = await \_buttonService\.GetButtonConfigsAsync\(pageId\);

            return Ok\(configs\);

        \}

        \[HttpPost\("config"\)\]

        public async Task<IActionResult> SaveButtonConfig\(\[FromBody\] ButtonConfigDto config\)

        \{

            var result = await \_buttonService\.SaveButtonConfigAsync\(config\);

            return Ok\(result\);

        \}

    \}

\}

### <a id="_Toc209713915"></a>Microservice implementacija

// Services/ButtonService\.cs

using DynUI\.Models\.UI;

using DynUI\.Data\.Entities;

using DynUI\.Data;

using Microsoft\.EntityFrameworkCore;

using System\.Text\.Json;

namespace DynUI\.Services

\{

    public interface IButtonService

    \{

        Task<object> ExecuteActionAsync\(ButtonActionRequest request\);

        Task<List<ButtonConfigDto>> GetButtonConfigsAsync\(int pageId\);

        Task<ButtonConfigDto> SaveButtonConfigAsync\(ButtonConfigDto config\);

    \}

    public class ButtonService : IButtonService

    \{

        private readonly DynUIDbContext \_context;

        private readonly IServiceProvider \_serviceProvider;

        private readonly ILogger<ButtonService> \_logger;

        public ButtonService\(DynUIDbContext context, IServiceProvider serviceProvider, ILogger<ButtonService> logger\)

        \{

            \_context = context;

            \_serviceProvider = serviceProvider;

            \_logger = logger;

        \}

        public async Task<object> ExecuteActionAsync\(ButtonActionRequest request\)

        \{

            \_logger\.LogInformation\("Executing button action: \{Action\}", request\.Action\);

            return request\.Action switch

            \{

                "save" => await HandleSaveAction\(request\.Parameters\),

                "delete" => await HandleDeleteAction\(request\.Parameters\),

                "navigate" => await HandleNavigateAction\(request\.Parameters\),

                "export" => await HandleExportAction\(request\.Parameters\),

                \_ => throw new NotSupportedException\($"Action '\{request\.Action\}' is not supported"\)

            \};

        \}

        public async Task<List<ButtonConfigDto>> GetButtonConfigsAsync\(int pageId\)

        \{

            var components = await \_context\.UIComponents

                \.Where\(c => c\.PageId == pageId && c\.ComponentType == "button"\)

                \.OrderBy\(c => c\.Order\)

                \.ToListAsync\(\);

            return components\.Select\(c => JsonSerializer\.Deserialize<ButtonConfigDto>\(c\.Configuration\)\!\)

                           \.ToList\(\);

        \}

        public async Task<ButtonConfigDto> SaveButtonConfigAsync\(ButtonConfigDto config\)

        \{

            var component = new UIComponentEntity

            \{

                ComponentType = "button",

                Configuration = JsonSerializer\.Serialize\(config\),

                IsActive = true

            \};

            \_context\.UIComponents\.Add\(component\);

            await \_context\.SaveChangesAsync\(\);

            return config;

        \}

        private async Task<object> HandleSaveAction\(Dictionary<string, object>? parameters\)

        \{

            // Implementacija save logike

            await Task\.Delay\(100\); // Simulacija async operacije

            return new \{ success = true, message = "Data saved successfully" \};

        \}

        private async Task<object> HandleDeleteAction\(Dictionary<string, object>? parameters\)

        \{

            // Implementacija delete logike  

            await Task\.Delay\(100\);

            return new \{ success = true, message = "Data deleted successfully" \};

        \}

        private async Task<object> HandleNavigateAction\(Dictionary<string, object>? parameters\)

        \{

            var route = parameters?\.GetValueOrDefault\("route"\)?\.ToString\(\);

            return new \{ success = true, redirectUrl = route \};

        \}

        private async Task<object> HandleExportAction\(Dictionary<string, object>? parameters\)

        \{

            // Implementacija export logike

            await Task\.Delay\(500\);

            return new \{ success = true, downloadUrl = "/api/exports/data\.xlsx" \};

        \}

    \}

\}

### <a id="_Toc209713916"></a>CSS stilovi \(dyn\-button\.scss\)

// styles/components/\_dyn\-button\.scss

\.dyn\-button \{

  // CSS Custom Properties \(Tokens\)

  \-\-font\-family: var\(\-\-font\-family\-theme, 'Segoe UI', system\-ui, sans\-serif\);

  \-\-font\-size: var\(\-\-font\-size\-default, 14px\);

  \-\-font\-weight: var\(\-\-font\-weight\-bold, 600\);

  \-\-line\-height: var\(\-\-line\-height\-none, 1\);

  \-\-border\-radius: var\(\-\-border\-radius\-md, 4px\);

  \-\-border\-width: var\(\-\-border\-width\-md, 1px\);

  \-\-padding: 0 1em;

  // Base styles

  display: inline\-flex;

  align\-items: center;

  justify\-content: center;

  gap: 0\.5rem;

  font\-family: var\(\-\-font\-family\);

  font\-size: var\(\-\-font\-size\);

  font\-weight: var\(\-\-font\-weight\);

  line\-height: var\(\-\-line\-height\);

  border: var\(\-\-border\-width\) solid var\(\-\-border\-color, transparent\);

  border\-radius: var\(\-\-border\-radius\);

  padding: var\(\-\-padding\);

  cursor: pointer;

  transition: all 0\.2s ease\-in\-out;

  position: relative;

  overflow: hidden;

  // Size variants

  &\-small \{ min\-height: 32px; \}

  &\-medium \{ min\-height: 44px; \}

  &\-large \{ min\-height: 56px; \}

  // Kind variants

  &\-primary \{

    \-\-text\-color: var\(\-\-color\-neutral\-light\-00, \#fff\);

    \-\-color: var\(\-\-color\-action\-default, \#0066cc\);

    \-\-background\-color: var\(\-\-color\-action\-default, \#0066cc\);

    color: var\(\-\-text\-color\);

    background\-color: var\(\-\-background\-color\);

    &:hover:not\(:disabled\) \{

      \-\-color\-hover: var\(\-\-color\-action\-hover, \#0052a3\);

      \-\-background\-hover: var\(\-\-color\-action\-hover, \#0052a3\);

      background\-color: var\(\-\-background\-hover\);

    \}

    &:active:not\(:disabled\) \{

      \-\-color\-pressed: var\(\-\-color\-action\-pressed, \#003d7a\);

      background\-color: var\(\-\-color\-pressed\);

    \}

  \}

  &\-secondary \{

    \-\-text\-color: var\(\-\-color\-action\-default, \#0066cc\);

    \-\-border\-color: var\(\-\-color\-action\-default, \#0066cc\);

    color: var\(\-\-text\-color\);

    border\-color: var\(\-\-border\-color\);

    background\-color: transparent;

    &:hover:not\(:disabled\) \{

      \-\-background\-hover: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

      \-\-border\-color\-hover: var\(\-\-color\-brand\-01\-darkest, \#003d7a\);

      background\-color: var\(\-\-background\-hover\);

      border\-color: var\(\-\-border\-color\-hover\);

    \}

  \}

  &\-tertiary \{

    \-\-text\-color: var\(\-\-color\-action\-default, \#0066cc\);

    color: var\(\-\-text\-color\);

    background\-color: transparent;

    &:hover:not\(:disabled\) \{

      \-\-background\-hover: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

      background\-color: var\(\-\-background\-hover\);

    \}

  \}

  // Danger state

  &\-danger:not\(\.dyn\-button\-tertiary\) \{

    \-\-text\-color\-danger: var\(\-\-color\-neutral\-light\-00, \#fff\);

    \-\-color\-button\-danger: var\(\-\-color\-feedback\-negative\-dark, \#d32f2f\);

    \-\-color\-danger\-hover: var\(\-\-color\-feedback\-negative\-darker, \#b71c1c\);

    color: var\(\-\-text\-color\-danger\);

    background\-color: var\(\-\-color\-button\-danger\);

    border\-color: var\(\-\-color\-button\-danger\);

    &:hover:not\(:disabled\) \{

      background\-color: var\(\-\-color\-danger\-hover\);

      border\-color: var\(\-\-color\-danger\-hover\);

    \}

  \}

  // Disabled state

  &:disabled, &\-disabled \{

    \-\-text\-color\-disabled: var\(\-\-color\-neutral\-dark\-70, \#666\);

    \-\-color\-disabled: var\(\-\-color\-action\-disabled, \#ccc\);

    color: var\(\-\-text\-color\-disabled\);

    background\-color: var\(\-\-color\-disabled\);

    border\-color: var\(\-\-color\-disabled\);

    cursor: not\-allowed;

    opacity: 0\.6;

  \}

  // Focus state

  &:focus\-visible \{

    \-\-outline\-color\-focused: var\(\-\-color\-action\-focus, \#0066cc\);

    outline: 2px solid var\(\-\-outline\-color\-focused\);

    outline\-offset: 2px;

  \}

  // Loading state

  &\-loading \{

    pointer\-events: none;

    \.dyn\-button\-loading\-icon \{

      width: 1em;

      height: 1em;

      border: 2px solid currentColor;

      border\-top: 2px solid transparent;

      border\-radius: 50%;

      animation: dyn\-button\-spin 1s linear infinite;

    \}

  \}

  // Icon only variant

  &\-icon\-only \{

    padding: 0\.5em;

    aspect\-ratio: 1;

  \}

\}

@keyframes dyn\-button\-spin \{

  0% \{ transform: rotate\(0deg\); \}

  100% \{ transform: rotate\(360deg\); \}

\}

## <a id="_Toc209713917"></a>Grupa 2: Display komponente \(Badge, Avatar, Icon, Label\)

### <a id="_Toc209713918"></a>DYNBadge \- Implementacija u React/TypeScript

#### <a id="_Toc209713919"></a>Angular interface:

interface DynBadgeProps \{

  value?: number;

  color?: string;

  status?: 'disabled' | 'negative' | 'positive' | 'warning';

  size?: 'small' | 'medium' | 'large';

  icon?: string | boolean | TemplateRef<void>;

  showBorder?: boolean;

  ariaLabel?: string;

\}

#### <a id="_Toc209713920"></a>React/TypeScript implementacija:

// types/badge\.types\.ts

export type BadgeStatus = 'disabled' | 'negative' | 'positive' | 'warning';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgeIcon = string | boolean | React\.ReactNode;

export interface DynBadgeProps \{

  value?: number;

  color?: string;

  status?: BadgeStatus;

  size?: BadgeSize;

  icon?: BadgeIcon;

  showBorder?: boolean;

  ariaLabel?: string;

  className?: string;

\}

export const DYN\_COLOR\_PALETTE = \[

  'color\-01', 'color\-02', 'color\-03', 'color\-04', 'color\-05', 'color\-06',

  'color\-07', 'color\-08', 'color\-09', 'color\-10', 'color\-11', 'color\-12'

\] as const;

// components/DynBadge\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynBadgeProps, DYN\_COLOR\_PALETTE \} from '\.\./types/badge\.types';

import \{ DynIcon \} from '\./DynIcon';

const DynBadge: React\.FC<DynBadgeProps> = \(\{

  value = 0,

  color = 'color\-07',

  status,

  size = 'medium',

  icon,

  showBorder = false,

  ariaLabel,

  className

\}\) => \{

  const displayValue = value > 9 ? '9\+' : value\.toString\(\);

  const isThemeColor = DYN\_COLOR\_PALETTE\.includes\(color as any\);

  const customStyle = \!isThemeColor ? \{ backgroundColor: color \} : \{\};

  const badgeClasses = classNames\(

    'dyn\-badge',

    \`dyn\-badge\-$\{size\}\`,

    \{

      \[\`dyn\-badge\-$\{color\}\`\]: isThemeColor,

      \[\`dyn\-badge\-status\-$\{status\}\`\]: status,

      'dyn\-badge\-border': showBorder,

      'dyn\-badge\-icon\-only': icon && \!value,

      'dyn\-badge\-with\-value': value > 0

    \},

    className

  \);

  const renderIcon = \(\) => \{

    if \(icon === true && status\) \{

      // Auto icon based on status

      const statusIcons = \{

        positive: 'dyn\-icon\-ok',

        negative: 'dyn\-icon\-close',

        warning: 'dyn\-icon\-warning',

        disabled: 'dyn\-icon\-minus'

      \};

      return <DynIcon icon=\{statusIcons\[status\]\} />;

    \}

    if \(typeof icon === 'string'\) \{

      return <DynIcon icon=\{icon\} />;

    \}

    return icon ? <span className="dyn\-badge\-custom\-icon">\{icon\}</span> : null;

  \};

  const renderContent = \(\) => \{

    if \(icon && \!value\) \{

      return renderIcon\(\);

    \}

    if \(value > 0 && icon\) \{

      return \(

        <>

          \{renderIcon\(\)\}

          <span className="dyn\-badge\-value">\{displayValue\}</span>

        </>

      \);

    \}

    return value > 0 ? <span className="dyn\-badge\-value">\{displayValue\}</span> : null;

  \};

  return \(

    <span

      className=\{badgeClasses\}

      style=\{customStyle\}

      aria\-label=\{ariaLabel || \`Badge with value $\{displayValue\}\`\}

      role="status"

    >

      \{renderContent\(\)\}

    </span>

  \);

\};

export default DynBadge;

### <a id="_Toc209713921"></a>DYNAvatar \- Implementacija u React/TypeScript

// types/avatar\.types\.ts

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarLoading = 'eager' | 'lazy';

export interface DynAvatarProps \{

  src: string;

  size?: AvatarSize;

  loading?: AvatarLoading;

  alt?: string;

  className?: string;

  onClick?: \(event: React\.MouseEvent<HTMLImageElement>\) => void;

\}

export const AVATAR\_SIZES = \{

  xs: 24,

  sm: 32, 

  md: 64,

  lg: 96,

  xl: 144

\} as const;

// components/DynAvatar\.tsx

import React, \{ useState \} from 'react';

import classNames from 'classnames';

import \{ DynAvatarProps, AVATAR\_SIZES \} from '\.\./types/avatar\.types';

const DynAvatar: React\.FC<DynAvatarProps> = \(\{

  src,

  size = 'md',

  loading = 'eager',

  alt = 'Avatar',

  className,

  onClick

\}\) => \{

  const \[imageError, setImageError\] = useState\(false\);

  const \[imageLoaded, setImageLoaded\] = useState\(false\);

  const hasClickEvent = \!\!onClick;

  const pixelSize = AVATAR\_SIZES\[size\];

  const avatarClasses = classNames\(

    'dyn\-avatar',

    \`dyn\-avatar\-$\{size\}\`,

    \{

      'dyn\-avatar\-clickable': hasClickEvent,

      'dyn\-avatar\-error': imageError,

      'dyn\-avatar\-loading': \!imageLoaded && \!imageError

    \},

    className

  \);

  const handleImageLoad = \(\) => \{

    setImageLoaded\(true\);

    setImageError\(false\);

  \};

  const handleImageError = \(\) => \{

    setImageError\(true\);

    setImageLoaded\(false\);

  \};

  const handleClick = \(event: React\.MouseEvent<HTMLImageElement>\) => \{

    if \(hasClickEvent\) \{

      onClick?\.\(event\);

    \}

  \};

  const renderPlaceholder = \(\) => \(

    <div className="dyn\-avatar\-placeholder" style=\{\{ 

      width: pixelSize, 

      height: pixelSize 

    \}\}>

      <span className="dyn\-avatar\-placeholder\-icon">≡ƒæñ</span>

    </div>

  \);

  if \(imageError || \!src\) \{

    return <div className=\{avatarClasses\}>\{renderPlaceholder\(\)\}</div>;

  \}

  return \(

    <div className=\{avatarClasses\}>

      \{\!imageLoaded && renderPlaceholder\(\)\}

      <img

        src=\{src\}

        alt=\{alt\}

        loading=\{loading\}

        width=\{pixelSize\}

        height=\{pixelSize\}

        className="dyn\-avatar\-image"

        onLoad=\{handleImageLoad\}

        onError=\{handleImageError\}

        onClick=\{handleClick\}

        style=\{\{ 

          display: imageLoaded ? 'block' : 'none'

        \}\}

      />

    </div>

  \);

\};

export default DynAvatar;

### <a id="_Toc209713922"></a>DYNIcon \- Implementacija u React/TypeScript

// types/icon\.types\.ts

export interface DynIconProps \{

  icon: string | React\.ReactNode;

  size?: string;

  className?: string;

\}

export interface IconDictionary \{

  \[key: string\]: string;

\}

// components/DynIcon\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynIconProps \} from '\.\./types/icon\.types';

import \{ useIconDictionary \} from '\.\./hooks/useIconDictionary';

const DynIcon: React\.FC<DynIconProps> = \(\{

  icon,

  size,

  className

\}\) => \{

  const iconDictionary = useIconDictionary\(\);

  if \(React\.isValidElement\(icon\)\) \{

    return <span className=\{classNames\('dyn\-icon\-custom', className\)\}>\{icon\}</span>;

  \}

  if \(typeof icon \!== 'string'\) \{

    return null;

  \}

  const processedIcon = processIconString\(icon, iconDictionary\);

  const iconClasses = classNames\(

    processedIcon\.baseClass,

    processedIcon\.iconClass,

    \{

      \[\`dyn\-icon\-$\{size\}\`\]: size

    \},

    className

  \);

  return <i className=\{iconClasses\} aria\-hidden="true" />;

\};

// Icon processing logic

const processIconString = \(iconStr: string, dictionary: Record<string, string>\) => \{

  const iconTokens = iconStr\.includes\(' '\) ? iconStr\.split\(' '\) : \[iconStr\];

  let processedClass = '';

  let baseClass = 'dyn\-icon';

  iconTokens\.forEach\(\(token, index\) => \{

    if \(dictionary\[token\]\) \{

      const dictValue = dictionary\[token\];

      if \(dictValue\.startsWith\('dyn\-icon '\)\) \{

        processedClass \+= \(index > 0 ? ' ' : ''\) \+ dictValue;

      \} else \{

        processedClass \+= \(index > 0 ? ' ' : ''\) \+ 'dyn\-fonts\-icon ' \+ dictValue;

      \}

    \} else \{

      if \(token\.startsWith\('dyn\-icon\-'\)\) \{

        processedClass \+= \(index > 0 ? ' ' : ''\) \+ token;

      \} else if \(token\.startsWith\('fa '\) || token\.startsWith\('fas '\) || token\.startsWith\('far '\)\) \{

        baseClass = 'dyn\-fonts\-icon';

        processedClass \+= \(index > 0 ? ' ' : ''\) \+ token;

      \} else \{

        processedClass \+= \(index > 0 ? ' ' : ''\) \+ token;

      \}

    \}

  \}\);

  return \{

    baseClass,

    iconClass: processedClass\.trim\(\)

  \};

\};

export default DynIcon;

### <a id="_Toc209713923"></a>DYNLabel \- Implementacija u React/TypeScript

// types/label\.types\.ts

export interface DynLabelProps \{

  label?: string;

  htmlFor?: string;

  disabled?: boolean;

  field?: boolean;

  requirement?: 'required' | 'optional';

  className?: string;

  children?: React\.ReactNode;

\}

// components/DynLabel\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynLabelProps \} from '\.\./types/label\.types';

const DynLabel: React\.FC<DynLabelProps> = \(\{

  label,

  htmlFor,

  disabled = false,

  field = false,

  requirement,

  className,

  children

\}\) => \{

  const labelClasses = classNames\(

    'dyn\-label',

    \{

      'dyn\-label\-disabled': disabled,

      'dyn\-label\-field': field,

      'dyn\-label\-required': requirement === 'required',

      'dyn\-label\-optional': requirement === 'optional'

    \},

    className

  \);

  const renderRequirement = \(\) => \{

    if \(requirement === 'required'\) \{

      return <span className="dyn\-label\-requirement dyn\-label\-required\-asterisk">\*</span>;

    \}

    if \(requirement === 'optional'\) \{

      return <span className="dyn\-label\-requirement dyn\-label\-optional\-text">\(optional\)</span>;

    \}

    return null;

  \};

  return \(

    <label className=\{labelClasses\} htmlFor=\{htmlFor\}>

      \{label && \(

        <span className="dyn\-label\-text">

          \{label\}

          \{renderRequirement\(\)\}

        </span>

      \)\}

      \{children\}

    </label>

  \);

\};

export default DynLabel;

### <a id="_Toc209713924"></a>\.NET Core modeli za Display komponente

// Models/UI/DisplayComponentModels\.cs

namespace DynUI\.Models\.UI

\{

    // Badge Models

    public enum BadgeStatus

    \{

        Disabled,

        Negative, 

        Positive,

        Warning

    \}

    public enum BadgeSize

    \{

        Small,

        Medium,

        Large

    \}

    public class BadgeConfigDto

    \{

        public int Value \{ get; set; \}

        public string? Color \{ get; set; \} = "color\-07";

        public BadgeStatus? Status \{ get; set; \}

        public BadgeSize Size \{ get; set; \} = BadgeSize\.Medium;

        public string? Icon \{ get; set; \}

        public bool ShowBorder \{ get; set; \} = false;

        public string? AriaLabel \{ get; set; \}

    \}

    // Avatar Models

    public enum AvatarSize

    \{

        XS, SM, MD, LG, XL

    \}

    public class AvatarConfigDto

    \{

        public string Src \{ get; set; \} = string\.Empty;

        public AvatarSize Size \{ get; set; \} = AvatarSize\.MD;

        public string Loading \{ get; set; \} = "eager";

        public string? Alt \{ get; set; \}

        public string? ClickAction \{ get; set; \}

    \}

    // Icon Models  

    public class IconConfigDto

    \{

        public string Icon \{ get; set; \} = string\.Empty;

        public string? Size \{ get; set; \}

        public string? Color \{ get; set; \}

        public Dictionary<string, string>? CustomProperties \{ get; set; \}

    \}

    // Label Models

    public class LabelConfigDto

    \{

        public string? Text \{ get; set; \}

        public string? HtmlFor \{ get; set; \}

        public bool Disabled \{ get; set; \} = false;

        public bool Field \{ get; set; \} = false;

        public string? Requirement \{ get; set; \}

    \}

\}

### <a id="_Toc209713925"></a>Entity Framework modeli za komponente

// Data/Entities/ComponentEntities\.cs

namespace DynUI\.Data\.Entities

\{

    public class BadgeEntity

    \{

        public int Id \{ get; set; \}

        public int Value \{ get; set; \}

        public string Color \{ get; set; \} = "color\-07";

        public string? Status \{ get; set; \}

        public string Size \{ get; set; \} = "medium";

        public string? Icon \{ get; set; \}

        public bool ShowBorder \{ get; set; \}

        public string? AriaLabel \{ get; set; \}

        // Audit fields

        public DateTime CreatedAt \{ get; set; \} = DateTime\.UtcNow;

        public DateTime? UpdatedAt \{ get; set; \}

    \}

    public class AvatarEntity 

    \{

        public int Id \{ get; set; \}

        public string Src \{ get; set; \} = string\.Empty;

        public string Size \{ get; set; \} = "md";

        public string Loading \{ get; set; \} = "eager";

        public string? Alt \{ get; set; \}

        public int? UserId \{ get; set; \}

        // Navigation

        public virtual UserEntity? User \{ get; set; \}

    \}

    public class IconLibraryEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string IconClass \{ get; set; \} = string\.Empty;

        public string Category \{ get; set; \} = string\.Empty;

        public string? Tags \{ get; set; \}

        public bool IsActive \{ get; set; \} = true;

    \}

\}

### <a id="_Toc209713926"></a>Microservice za Display komponente

// Services/DisplayComponentService\.cs

using DynUI\.Models\.UI;

using DynUI\.Data\.Entities;

namespace DynUI\.Services

\{

    public interface IDisplayComponentService

    \{

        Task<BadgeConfigDto> GetBadgeAsync\(int badgeId\);

        Task<BadgeConfigDto> CreateBadgeAsync\(BadgeConfigDto config\);

        Task<AvatarConfigDto> GetUserAvatarAsync\(int userId\);

        Task<List<IconConfigDto>> GetIconLibraryAsync\(string? category = null\);

        Task<string> ProcessIconTokensAsync\(string iconString\);

    \}

    public class DisplayComponentService : IDisplayComponentService

    \{

        private readonly DynUIDbContext \_context;

        private readonly ILogger<DisplayComponentService> \_logger;

        private readonly ICacheService \_cacheService;

        public DisplayComponentService\(

            DynUIDbContext context, 

            ILogger<DisplayComponentService> logger,

            ICacheService cacheService\)

        \{

            \_context = context;

            \_logger = logger;

            \_cacheService = cacheService;

        \}

        public async Task<BadgeConfigDto> GetBadgeAsync\(int badgeId\)

        \{

            var badge = await \_context\.Badges\.FindAsync\(badgeId\);

            if \(badge == null\) throw new NotFoundException\($"Badge \{badgeId\} not found"\);

            return MapBadgeToDto\(badge\);

        \}

        public async Task<BadgeConfigDto> CreateBadgeAsync\(BadgeConfigDto config\)

        \{

            var badge = MapDtoToBadge\(config\);

            \_context\.Badges\.Add\(badge\);

            await \_context\.SaveChangesAsync\(\);

            return MapBadgeToDto\(badge\);

        \}

        public async Task<AvatarConfigDto> GetUserAvatarAsync\(int userId\)

        \{

            var cacheKey = $"user\_avatar\_\{userId\}";

            var cached = await \_cacheService\.GetAsync<AvatarConfigDto>\(cacheKey\);

            if \(cached \!= null\) return cached;

            var avatar = await \_context\.Avatars

                \.FirstOrDefaultAsync\(a => a\.UserId == userId\);

            var config = avatar \!= null ? MapAvatarToDto\(avatar\) : GetDefaultAvatar\(\);

            await \_cacheService\.SetAsync\(cacheKey, config, TimeSpan\.FromMinutes\(30\)\);

            return config;

        \}

        public async Task<List<IconConfigDto>> GetIconLibraryAsync\(string? category = null\)

        \{

            var query = \_context\.IconLibrary\.Where\(i => i\.IsActive\);

            if \(\!string\.IsNullOrEmpty\(category\)\)

                query = query\.Where\(i => i\.Category == category\);

            var icons = await query\.OrderBy\(i => i\.Name\)\.ToListAsync\(\);

            return icons\.Select\(MapIconToDto\)\.ToList\(\);

        \}

        public async Task<string> ProcessIconTokensAsync\(string iconString\)

        \{

            // Load icon dictionary from cache or database

            var dictionary = await GetIconDictionary\(\);

            var tokens = iconString\.Contains\(' '\) ? iconString\.Split\(' '\) : new\[\] \{ iconString \};

            var processedParts = new List<string>\(\);

            foreach \(var token in tokens\)

            \{

                if \(dictionary\.ContainsKey\(token\)\)

                \{

                    var dictValue = dictionary\[token\];

                    processedParts\.Add\(dictValue\.StartsWith\("dyn\-icon "\) 

                        ? dictValue 

                        : $"dyn\-fonts\-icon \{dictValue\}"\);

                \}

                else

                \{

                    processedParts\.Add\(token\.StartsWith\("dyn\-icon\-"\) 

                        ? token 

                        : $"dyn\-fonts\-icon \{token\}"\);

                \}

            \}

            return string\.Join\(" ", processedParts\);

        \}

        private async Task<Dictionary<string, string>> GetIconDictionary\(\)

        \{

            const string cacheKey = "icon\_dictionary";

            var cached = await \_cacheService\.GetAsync<Dictionary<string, string>>\(cacheKey\);

            if \(cached \!= null\) return cached;

            var icons = await \_context\.IconLibrary

                \.Where\(i => i\.IsActive\)

                \.ToDictionaryAsync\(i => i\.Name, i => i\.IconClass\);

            await \_cacheService\.SetAsync\(cacheKey, icons, TimeSpan\.FromHours\(1\)\);

            return icons;

        \}

        // Mapping methods

        private BadgeConfigDto MapBadgeToDto\(BadgeEntity badge\) => new\(\)

        \{

            Value = badge\.Value,

            Color = badge\.Color,

            Status = Enum\.TryParse<BadgeStatus>\(badge\.Status, out var status\) ? status : null,

            Size = Enum\.Parse<BadgeSize>\(badge\.Size, true\),

            Icon = badge\.Icon,

            ShowBorder = badge\.ShowBorder,

            AriaLabel = badge\.AriaLabel

        \};

        private BadgeEntity MapDtoToBadge\(BadgeConfigDto dto\) => new\(\)

        \{

            Value = dto\.Value,

            Color = dto\.Color ?? "color\-07",

            Status = dto\.Status?\.ToString\(\),

            Size = dto\.Size\.ToString\(\)\.ToLower\(\),

            Icon = dto\.Icon,

            ShowBorder = dto\.ShowBorder,

            AriaLabel = dto\.AriaLabel

        \};

        private AvatarConfigDto MapAvatarToDto\(AvatarEntity avatar\) => new\(\)

        \{

            Src = avatar\.Src,

            Size = Enum\.Parse<AvatarSize>\(avatar\.Size\.ToUpper\(\)\),

            Loading = avatar\.Loading,

            Alt = avatar\.Alt

        \};

        private IconConfigDto MapIconToDto\(IconLibraryEntity icon\) => new\(\)

        \{

            Icon = icon\.Name,

            Size = null,

            CustomProperties = new Dictionary<string, string>

            \{

                \["class"\] = icon\.IconClass,

                \["category"\] = icon\.Category

            \}

        \};

        private AvatarConfigDto GetDefaultAvatar\(\) => new\(\)

        \{

            Src = "/assets/default\-avatar\.png",

            Size = AvatarSize\.MD,

            Loading = "eager",

            Alt = "Default Avatar"

        \};

    \}

\}

### <a id="_Toc209713927"></a>CSS stilovi za Display komponente

// styles/components/\_dyn\-display\-components\.scss

// Badge Styles

\.dyn\-badge \{

  \-\-badge\-height\-small: 8px;

  \-\-badge\-height\-medium: 16px; 

  \-\-badge\-height\-large: 24px;

  display: inline\-flex;

  align\-items: center;

  justify\-content: center;

  border\-radius: 50px;

  font\-size: 0\.75rem;

  font\-weight: 600;

  line\-height: 1;

  white\-space: nowrap;

  &\-small \{ 

    height: var\(\-\-badge\-height\-small\);

    min\-width: var\(\-\-badge\-height\-small\);

    padding: 0 4px;

  \}

  &\-medium \{ 

    height: var\(\-\-badge\-height\-medium\);

    min\-width: var\(\-\-badge\-height\-medium\);

    padding: 0 6px;

  \}

  &\-large \{ 

    height: var\(\-\-badge\-height\-large\);

    min\-width: var\(\-\-badge\-height\-large\);

    padding: 0 8px;

  \}

  // Theme colors

  &\-color\-01 \{ background\-color: var\(\-\-color\-01, \#3f51b5\); color: white; \}

  &\-color\-02 \{ background\-color: var\(\-\-color\-02, \#009688\); color: white; \}

  // \.\.\. other colors

  // Status colors

  &\-status\-positive \{ background\-color: var\(\-\-color\-feedback\-positive, \#4caf50\); color: white; \}

  &\-status\-negative \{ background\-color: var\(\-\-color\-feedback\-negative, \#f44336\); color: white; \}

  &\-status\-warning \{ background\-color: var\(\-\-color\-feedback\-warning, \#ff9800\); color: white; \}

  &\-status\-disabled \{ background\-color: var\(\-\-color\-neutral\-dark\-70, \#666\); color: white; \}

  &\-border \{

    border: 2px solid var\(\-\-color\-neutral\-light\-00, white\);

    box\-shadow: 0 0 0 1px var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-icon\-only \{

    padding: 2px;

    aspect\-ratio: 1;

  \}

\}

// Avatar Styles  

\.dyn\-avatar \{

  \-\-avatar\-size\-xs: 24px;

  \-\-avatar\-size\-sm: 32px;

  \-\-avatar\-size\-md: 64px; 

  \-\-avatar\-size\-lg: 96px;

  \-\-avatar\-size\-xl: 144px;

  position: relative;

  display: inline\-block;

  border\-radius: 50%;

  overflow: hidden;

  background\-color: var\(\-\-color\-neutral\-light\-05, \#f5f5f5\);

  &\-xs \{ width: var\(\-\-avatar\-size\-xs\); height: var\(\-\-avatar\-size\-xs\); \}

  &\-sm \{ width: var\(\-\-avatar\-size\-sm\); height: var\(\-\-avatar\-size\-sm\); \}

  &\-md \{ width: var\(\-\-avatar\-size\-md\); height: var\(\-\-avatar\-size\-md\); \}

  &\-lg \{ width: var\(\-\-avatar\-size\-lg\); height: var\(\-\-avatar\-size\-lg\); \}

  &\-xl \{ width: var\(\-\-avatar\-size\-xl\); height: var\(\-\-avatar\-size\-xl\); \}

  &\-image \{

    width: 100%;

    height: 100%;

    object\-fit: cover;

    display: block;

  \}

  &\-placeholder \{

    width: 100%;

    height: 100%;

    display: flex;

    align\-items: center;

    justify\-content: center;

    background\-color: var\(\-\-color\-neutral\-light\-20, \#ddd\);

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-size: 0\.5em;

  \}

  &\-clickable \{

    cursor: pointer;

    transition: transform 0\.2s ease;

    &:hover \{

      transform: scale\(1\.05\);

    \}

  \}

  &\-loading \{

    &::after \{

      content: '';

      position: absolute;

      top: 0;

      left: 0;

      right: 0;

      bottom: 0;

      background: linear\-gradient\(90deg, transparent, rgba\(255,255,255,0\.4\), transparent\);

      animation: shimmer 1\.5s infinite;

    \}

  \}

\}

// Icon Styles

\.dyn\-icon \{

  display: inline\-block;

  font\-style: normal;

  font\-variant: normal;

  text\-rendering: auto;

  line\-height: 1;

  &\-custom \{

    display: inline\-flex;

    align\-items: center;

    justify\-content: center;

  \}

\}

\.dyn\-fonts\-icon \{

  font\-family: 'DYNUI Icons', 'Font Awesome', sans\-serif;

\}

// Label Styles

\.dyn\-label \{

  display: inline\-block;

  margin\-bottom: 0\.5rem;

  font\-weight: 500;

  color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  &\-text \{

    display: flex;

    align\-items: center;

    gap: 0\.25rem;

  \}

  &\-requirement \{

    font\-size: 0\.875em;

  \}

  &\-required\-asterisk \{

    color: var\(\-\-color\-feedback\-negative, \#f44336\);

  \}

  &\-optional\-text \{

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-style: italic;

  \}

  &\-disabled \{

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    opacity: 0\.6;

  \}

  &\-field \{

    margin\-bottom: 0\.25rem;

    font\-size: 0\.875rem;

  \}

\}

@keyframes shimmer \{

  0% \{ transform: translateX\(\-100%\); \}

  100% \{ transform: translateX\(100%\); \}

\}

### <a id="_Toc209713928"></a>Hook za ikone

// hooks/useIconDictionary\.ts

import \{ useContext \} from 'react';

import \{ IconDictionaryContext \} from '\.\./contexts/IconDictionaryContext';

export const useIconDictionary = \(\) => \{

  const context = useContext\(IconDictionaryContext\);

  if \(\!context\) \{

    throw new Error\('useIconDictionary must be used within IconDictionaryProvider'\);

  \}

  return context;

\};

// contexts/IconDictionaryContext\.tsx

import React, \{ createContext, useEffect, useState \} from 'react';

import \{ IconDictionary \} from '\.\./types/icon\.types';

interface IconDictionaryContextType \{

  \[key: string\]: string;

\}

export const IconDictionaryContext = createContext<IconDictionaryContextType>\(\{\}\);

interface Props \{

  children: React\.ReactNode;

  customDictionary?: IconDictionary;

\}

export const IconDictionaryProvider: React\.FC<Props> = \(\{ 

  children, 

  customDictionary = \{\} 

\}\) => \{

  const \[dictionary, setDictionary\] = useState<IconDictionaryContextType>\(\{\}\);

  useEffect\(\(\) => \{

    // Load default DYNUI icons \+ custom dictionary

    const defaultIcons = \{

      'user': 'dyn\-icon\-user',

      'home': 'dyn\-icon\-home',

      'settings': 'dyn\-icon\-settings',

      'ok': 'dyn\-icon\-ok',

      'close': 'dyn\-icon\-close',

      'warning': 'dyn\-icon\-warning',

      'minus': 'dyn\-icon\-minus'

      // Add more default mappings

    \};

    setDictionary\(\{ \.\.\.defaultIcons, \.\.\.customDictionary \}\);

  \}, \[customDictionary\]\);

  return \(

    <IconDictionaryContext\.Provider value=\{dictionary\}>

      \{children\}

    </IconDictionaryContext\.Provider>

  \);

\};

Ovom implementacijom pokrivam kompletan set Display komponenti koji su potpuno kompatibilni sa originalnim DYNUI dizajnom\. Komponente podr┼╛avaju:

1. \*\*Badge\*\*: Broja─ìe notifikacija sa status indikatorima
2. \*\*Avatar\*\*: Korisni─ìki avatari sa razli─ìitim veli─ìinama
3. \*\*Icon\*\*: Fleksibilan sistem ikona sa dictionary podr┼íkom
4. \*\*Label\*\*: Labeli za forme sa requirement indikatorima

## <a id="_Toc209713929"></a>Grupa 3: Layout komponente \(Container, Divider, Grid, Page\)

### <a id="_Toc209713930"></a>DYNContainer \- Implementacija u React/TypeScript

#### <a id="_Toc209713931"></a>Angular interface:

interface DynContainerProps \{

  height?: number;

  noBorder?: boolean;

  noPadding?: boolean;

  title?: string;

\}

#### <a id="_Toc209713932"></a>React/TypeScript implementacija:

// types/container\.types\.ts

export interface DynContainerProps \{

  height?: number;

  noBorder?: boolean;

  noPadding?: boolean;

  title?: string;

  className?: string;

  children?: React\.ReactNode;

  style?: React\.CSSProperties;

\}

// components/DynContainer\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynContainerProps \} from '\.\./types/container\.types';

const DynContainer: React\.FC<DynContainerProps> = \(\{

  height,

  noBorder = false,

  noPadding = false,

  title,

  className,

  children,

  style

\}\) => \{

  const containerClasses = classNames\(

    'dyn\-container',

    \{

      'dyn\-container\-no\-border': noBorder,

      'dyn\-container\-no\-padding': noPadding,

      'dyn\-container\-with\-title': \!\!title

    \},

    className

  \);

  const containerStyle: React\.CSSProperties = \{

    \.\.\.style,

    \.\.\.\(height && \{ height: \`$\{height\}px\` \}\)

  \};

  return \(

    <div className=\{containerClasses\} style=\{containerStyle\}>

      \{title && \(

        <div className="dyn\-container\-header">

          <h2 className="dyn\-container\-title">\{title\}</h2>

        </div>

      \)\}

      <div className="dyn\-container\-content">

        \{children\}

      </div>

    </div>

  \);

\};

export default DynContainer;

### <a id="_Toc209713933"></a>DYNDivider \- Implementacija u React/TypeScript

// types/divider\.types\.ts

export type DividerSize = 'small' | 'medium' | 'large';

export interface DynDividerProps \{

  label?: string;

  borderWidth?: DividerSize;

  className?: string;

\}

export const DIVIDER\_COORDINATES = \{

  small: \{ x1: '0\.1%', x2: '99\.9%' \},

  medium: \{ x1: '0\.2%', x2: '99\.8%' \},

  large: \{ x1: '0\.3%', x2: '99\.7%' \}

\} as const;

// components/DynDivider\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynDividerProps, DIVIDER\_COORDINATES \} from '\.\./types/divider\.types';

const DynDivider: React\.FC<DynDividerProps> = \(\{

  label,

  borderWidth = 'small',

  className

\}\) => \{

  const coordinates = DIVIDER\_COORDINATES\[borderWidth\];

  const dividerClasses = classNames\(

    'dyn\-divider',

    \`dyn\-divider\-$\{borderWidth\}\`,

    \{

      'dyn\-divider\-with\-label': \!\!label

    \},

    className

  \);

  if \(label\) \{

    return \(

      <div className=\{dividerClasses\} role="separator" aria\-label=\{label\}>

        <div className="dyn\-divider\-content">

          <div className="dyn\-divider\-line dyn\-divider\-line\-left" />

          <span className="dyn\-divider\-label">\{label\}</span>

          <div className="dyn\-divider\-line dyn\-divider\-line\-right" />

        </div>

      </div>

    \);

  \}

  return \(

    <div className=\{dividerClasses\} role="separator">

      <svg className="dyn\-divider\-svg" viewBox="0 0 100 1" preserveAspectRatio="none">

        <line

          x1=\{coordinates\.x1\}

          y1="0\.5"

          x2=\{coordinates\.x2\}

          y2="0\.5"

          className="dyn\-divider\-svg\-line"

          strokeLinecap="round"

        />

      </svg>

    </div>

  \);

\};

export default DynDivider;

### <a id="_Toc209713934"></a>DYNGrid \- Implementacija u React/TypeScript

// types/grid\.types\.ts

export interface GridColumn \{

  property: string;

  label?: string;

  type?: 'string' | 'number' | 'date' | 'boolean' | 'currency' | 'time';

  width?: string;

  format?: string;

  sortable?: boolean;

  visible?: boolean;

  action?: \(value: any, row: any\) => void;

\}

export interface GridAction \{

  label: string;

  action: \(row: any\) => void;

  icon?: string;

  disabled?: \(row: any\) => boolean;

  visible?: \(row: any\) => boolean;

\}

export interface DynGridProps \{

  columns: GridColumn\[\];

  items: any\[\];

  actions?: GridAction\[\];

  loading?: boolean;

  striped?: boolean;

  bordered?: boolean;

  hover?: boolean;

  spacing?: 'small' | 'medium' | 'large';

  emptyMessage?: string;

  className?: string;

  onRowClick?: \(row: any, index: number\) => void;

  onSort?: \(column: GridColumn, order: 'asc' | 'desc'\) => void;

\}

export interface GridSortState \{

  column?: string;

  order?: 'asc' | 'desc';

\}

// components/DynGrid\.tsx

import React, \{ useState, useMemo \} from 'react';

import classNames from 'classnames';

import \{ DynGridProps, GridColumn, GridSortState \} from '\.\./types/grid\.types';

import \{ DynButton \} from '\./DynButton';

import \{ DynIcon \} from '\./DynIcon';

const DynGrid: React\.FC<DynGridProps> = \(\{

  columns,

  items,

  actions = \[\],

  loading = false,

  striped = false,

  bordered = true,

  hover = true,

  spacing = 'medium',

  emptyMessage = 'Nenhum registro encontrado',

  className,

  onRowClick,

  onSort

\}\) => \{

  const \[sortState, setSortState\] = useState<GridSortState>\(\{\}\);

  const visibleColumns = useMemo\(\(\) => 

    columns\.filter\(col => col\.visible \!== false\), \[columns\]\);

  const handleSort = \(column: GridColumn\) => \{

    if \(\!column\.sortable || \!onSort\) return;

    const newOrder = sortState\.column === column\.property && sortState\.order === 'asc' 

      ? 'desc' 

      : 'asc';

    const newSortState = \{ column: column\.property, order: newOrder \};

    setSortState\(newSortState\);

    onSort\(column, newOrder\);

  \};

  const formatCellValue = \(value: any, column: GridColumn\): string => \{

    if \(value == null\) return '';

    switch \(column\.type\) \{

      case 'date':

        return new Date\(value\)\.toLocaleDateString\(\);

      case 'time':

        return new Date\(value\)\.toLocaleTimeString\(\);

      case 'currency':

        return new Intl\.NumberFormat\('pt\-BR', \{

          style: 'currency',

          currency: 'BRL'

        \}\)\.format\(value\);

      case 'number':

        return new Intl\.NumberFormat\('pt\-BR'\)\.format\(value\);

      case 'boolean':

        return value ? 'Sim' : 'N├úo';

      default:

        return String\(value\);

    \}

  \};

  const renderCell = \(item: any, column: GridColumn, rowIndex: number\) => \{

    const value = item\[column\.property\];

    if \(column\.action\) \{

      return \(

        <DynButton

          label=\{formatCellValue\(value, column\)\}

          kind="tertiary"

          onClick=\{\(\) => column\.action\!\(value, item\)\}

        />

      \);

    \}

    return formatCellValue\(value, column\);

  \};

  const renderActions = \(item: any, rowIndex: number\) => \{

    const visibleActions = actions\.filter\(action => 

      \!action\.visible || action\.visible\(item\)\);

    if \(visibleActions\.length === 0\) return null;

    return \(

      <div className="dyn\-grid\-actions">

        \{visibleActions\.map\(\(action, actionIndex\) => \(

          <DynButton

            key=\{actionIndex\}

            icon=\{action\.icon\}

            kind="tertiary"

            size="small"

            disabled=\{action\.disabled?\.\(item\)\}

            onClick=\{\(\) => action\.action\(item\)\}

            ariaLabel=\{action\.label\}

          />

        \)\)\}

      </div>

    \);

  \};

  const gridClasses = classNames\(

    'dyn\-grid',

    \`dyn\-grid\-spacing\-$\{spacing\}\`,

    \{

      'dyn\-grid\-striped': striped,

      'dyn\-grid\-bordered': bordered,

      'dyn\-grid\-hover': hover,

      'dyn\-grid\-loading': loading

    \},

    className

  \);

  if \(loading\) \{

    return \(

      <div className=\{gridClasses\}>

        <div className="dyn\-grid\-loading\-container">

          <div className="dyn\-grid\-loading\-spinner" />

          <span>Carregando\.\.\.</span>

        </div>

      </div>

    \);

  \}

  if \(items\.length === 0\) \{

    return \(

      <div className=\{gridClasses\}>

        <div className="dyn\-grid\-empty">

          <DynIcon icon="dyn\-icon\-info" />

          <span>\{emptyMessage\}</span>

        </div>

      </div>

    \);

  \}

  return \(

    <div className=\{gridClasses\}>

      <div className="dyn\-grid\-container">

        <table className="dyn\-grid\-table">

          <thead className="dyn\-grid\-header">

            <tr>

              \{visibleColumns\.map\(\(column, index\) => \(

                <th

                  key=\{index\}

                  className=\{classNames\('dyn\-grid\-header\-cell', \{

                    'dyn\-grid\-sortable': column\.sortable,

                    'dyn\-grid\-sorted': sortState\.column === column\.property

                  \}\)\}

                  style=\{\{ width: column\.width \}\}

                  onClick=\{\(\) => handleSort\(column\)\}

                >

                  <div className="dyn\-grid\-header\-content">

                    <span>\{column\.label || column\.property\}</span>

                    \{column\.sortable && \(

                      <div className="dyn\-grid\-sort\-icons">

                        <DynIcon 

                          icon="dyn\-icon\-arrow\-up"

                          className=\{classNames\(\{

                            'dyn\-grid\-sort\-active': sortState\.column === column\.property && sortState\.order === 'asc'

                          \}\)\}

                        />

                        <DynIcon 

                          icon="dyn\-icon\-arrow\-down"

                          className=\{classNames\(\{

                            'dyn\-grid\-sort\-active': sortState\.column === column\.property && sortState\.order === 'desc'

                          \}\)\}

                        />

                      </div>

                    \)\}

                  </div>

                </th>

              \)\)\}

              \{actions\.length > 0 && \(

                <th className="dyn\-grid\-header\-cell dyn\-grid\-actions\-header">

                  A├º├╡es

                </th>

              \)\}

            </tr>

          </thead>

          <tbody className="dyn\-grid\-body">

            \{items\.map\(\(item, rowIndex\) => \(

              <tr

                key=\{rowIndex\}

                className=\{classNames\('dyn\-grid\-row', \{

                  'dyn\-grid\-row\-clickable': \!\!onRowClick

                \}\)\}

                onClick=\{\(\) => onRowClick?\.\(item, rowIndex\)\}

              >

                \{visibleColumns\.map\(\(column, colIndex\) => \(

                  <td

                    key=\{colIndex\}

                    className="dyn\-grid\-cell"

                    title=\{formatCellValue\(item\[column\.property\], column\)\}

                  >

                    \{renderCell\(item, column, rowIndex\)\}

                  </td>

                \)\)\}

                \{actions\.length > 0 && \(

                  <td className="dyn\-grid\-cell dyn\-grid\-actions\-cell">

                    \{renderActions\(item, rowIndex\)\}

                  </td>

                \)\}

              </tr>

            \)\)\}

          </tbody>

        </table>

      </div>

    </div>

  \);

\};

export default DynGrid;

### <a id="_Toc209713935"></a>DYNPage \- Implementacija u React/TypeScript

// types/page\.types\.ts

export interface DynPageProps \{

  children: React\.ReactNode;

  className?: string;

  withMenu?: boolean;

\}

export interface DynPageHeaderProps \{

  title?: string;

  subtitle?: string;

  breadcrumb?: BreadcrumbItem\[\];

  actions?: PageAction\[\];

  className?: string;

\}

export interface DynPageContentProps \{

  children: React\.ReactNode;

  className?: string;

\}

export interface BreadcrumbItem \{

  label: string;

  link?: string;

\}

export interface PageAction \{

  label: string;

  action: \(\) => void;

  icon?: string;

  kind?: 'primary' | 'secondary' | 'tertiary';

  disabled?: boolean;

\}

// components/DynPage\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynPageProps \} from '\.\./types/page\.types';

const DynPage: React\.FC<DynPageProps> = \(\{

  children,

  className,

  withMenu = false

\}\) => \{

  const pageClasses = classNames\(

    'dyn\-page',

    \{

      'dyn\-page\-with\-menu': withMenu

    \},

    className

  \);

  return \(

    <div className=\{pageClasses\}>

      \{children\}

    </div>

  \);

\};

// components/DynPageHeader\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynPageHeaderProps \} from '\.\./types/page\.types';

import \{ DynButton \} from '\./DynButton';

const DynPageHeader: React\.FC<DynPageHeaderProps> = \(\{

  title,

  subtitle,

  breadcrumb = \[\],

  actions = \[\],

  className

\}\) => \{

  const headerClasses = classNames\('dyn\-page\-header', className\);

  const renderBreadcrumb = \(\) => \{

    if \(breadcrumb\.length === 0\) return null;

    return \(

      <nav className="dyn\-page\-breadcrumb" aria\-label="Breadcrumb">

        <ol className="dyn\-page\-breadcrumb\-list">

          \{breadcrumb\.map\(\(item, index\) => \(

            <li key=\{index\} className="dyn\-page\-breadcrumb\-item">

              \{item\.link ? \(

                <a href=\{item\.link\} className="dyn\-page\-breadcrumb\-link">

                  \{item\.label\}

                </a>

              \) : \(

                <span className="dyn\-page\-breadcrumb\-current">\{item\.label\}</span>

              \)\}

              \{index < breadcrumb\.length \- 1 && \(

                <span className="dyn\-page\-breadcrumb\-separator">/</span>

              \)\}

            </li>

          \)\)\}

        </ol>

      </nav>

    \);

  \};

  return \(

    <header className=\{headerClasses\}>

      \{renderBreadcrumb\(\)\}

      <div className="dyn\-page\-header\-content">

        <div className="dyn\-page\-header\-text">

          \{title && <h1 className="dyn\-page\-title">\{title\}</h1>\}

          \{subtitle && <p className="dyn\-page\-subtitle">\{subtitle\}</p>\}

        </div>

        \{actions\.length > 0 && \(

          <div className="dyn\-page\-header\-actions">

            \{actions\.map\(\(action, index\) => \(

              <DynButton

                key=\{index\}

                label=\{action\.label\}

                icon=\{action\.icon\}

                kind=\{action\.kind || 'secondary'\}

                disabled=\{action\.disabled\}

                onClick=\{action\.action\}

              />

            \)\)\}

          </div>

        \)\}

      </div>

    </header>

  \);

\};

// components/DynPageContent\.tsx

const DynPageContent: React\.FC<DynPageContentProps> = \(\{

  children,

  className

\}\) => \{

  const contentClasses = classNames\('dyn\-page\-content', className\);

  return \(

    <main className=\{contentClasses\}>

      \{children\}

    </main>

  \);

\};

export \{ DynPage, DynPageHeader, DynPageContent \};

### <a id="_Toc209713936"></a>\.NET Core modeli za Layout komponente

// Models/UI/LayoutComponentModels\.cs

namespace DynUI\.Models\.UI

\{

    // Container Models

    public class ContainerConfigDto

    \{

        public int? Height \{ get; set; \}

        public bool NoBorder \{ get; set; \} = false;

        public bool NoPadding \{ get; set; \} = false;

        public string? Title \{ get; set; \}

        public List<UIComponentDto> Children \{ get; set; \} = new\(\);

    \}

    // Divider Models

    public enum DividerSize

    \{

        Small,

        Medium,

        Large

    \}

    public class DividerConfigDto

    \{

        public string? Label \{ get; set; \}

        public DividerSize BorderWidth \{ get; set; \} = DividerSize\.Small;

    \}

    // Grid Models

    public class GridColumnDto

    \{

        public string Property \{ get; set; \} = string\.Empty;

        public string? Label \{ get; set; \}

        public string Type \{ get; set; \} = "string";

        public string? Width \{ get; set; \}

        public string? Format \{ get; set; \}

        public bool Sortable \{ get; set; \} = false;

        public bool Visible \{ get; set; \} = true;

        public string? ActionEndpoint \{ get; set; \}

    \}

    public class GridActionDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string ActionEndpoint \{ get; set; \} = string\.Empty;

        public string? Icon \{ get; set; \}

        public string? DisabledCondition \{ get; set; \}

        public string? VisibleCondition \{ get; set; \}

    \}

    public class GridConfigDto

    \{

        public List<GridColumnDto> Columns \{ get; set; \} = new\(\);

        public List<GridActionDto> Actions \{ get; set; \} = new\(\);

        public bool Loading \{ get; set; \} = false;

        public bool Striped \{ get; set; \} = false;

        public bool Bordered \{ get; set; \} = true;

        public bool Hover \{ get; set; \} = true;

        public string Spacing \{ get; set; \} = "medium";

        public string EmptyMessage \{ get; set; \} = "Nenhum registro encontrado";

        public string DataEndpoint \{ get; set; \} = string\.Empty;

    \}

    // Page Models

    public class BreadcrumbItemDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string? Link \{ get; set; \}

    \}

    public class PageActionDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string ActionEndpoint \{ get; set; \} = string\.Empty;

        public string? Icon \{ get; set; \}

        public string Kind \{ get; set; \} = "secondary";

        public bool Disabled \{ get; set; \} = false;

    \}

    public class PageConfigDto

    \{

        public string? Title \{ get; set; \}

        public string? Subtitle \{ get; set; \}

        public List<BreadcrumbItemDto> Breadcrumb \{ get; set; \} = new\(\);

        public List<PageActionDto> Actions \{ get; set; \} = new\(\);

        public bool WithMenu \{ get; set; \} = false;

        public List<ContainerConfigDto> Containers \{ get; set; \} = new\(\);

    \}

\}

### <a id="_Toc209713937"></a>Entity Framework modeli za Layout

// Data/Entities/LayoutEntities\.cs

namespace DynUI\.Data\.Entities

\{

    public class PageLayoutEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string Route \{ get; set; \} = string\.Empty;

        public string? Title \{ get; set; \}

        public string? Subtitle \{ get; set; \}

        public bool WithMenu \{ get; set; \} = false;

        public string? MetaTags \{ get; set; \} // JSON

        public bool IsActive \{ get; set; \} = true;

        public DateTime CreatedAt \{ get; set; \} = DateTime\.UtcNow;

        public DateTime? UpdatedAt \{ get; set; \}

        // Navigation properties

        public virtual ICollection<ContainerEntity> Containers \{ get; set; \} = new List<ContainerEntity>\(\);

        public virtual ICollection<BreadcrumbEntity> Breadcrumbs \{ get; set; \} = new List<BreadcrumbEntity>\(\);

    \}

    public class ContainerEntity

    \{

        public int Id \{ get; set; \}

        public int PageLayoutId \{ get; set; \}

        public string? Title \{ get; set; \}

        public int? Height \{ get; set; \}

        public bool NoBorder \{ get; set; \} = false;

        public bool NoPadding \{ get; set; \} = false;

        public int Order \{ get; set; \}

        public string Configuration \{ get; set; \} = string\.Empty; // JSON

        // Navigation properties

        public virtual PageLayoutEntity PageLayout \{ get; set; \} = null\!;

        public virtual ICollection<UIComponentEntity> Components \{ get; set; \} = new List<UIComponentEntity>\(\);

    \}

    public class BreadcrumbEntity

    \{

        public int Id \{ get; set; \}

        public int PageLayoutId \{ get; set; \}

        public string Label \{ get; set; \} = string\.Empty;

        public string? Link \{ get; set; \}

        public int Order \{ get; set; \}

        // Navigation properties

        public virtual PageLayoutEntity PageLayout \{ get; set; \} = null\!;

    \}

    public class GridDefinitionEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string DataSource \{ get; set; \} = string\.Empty; // Table name or API endpoint

        public string Configuration \{ get; set; \} = string\.Empty; // JSON with columns, actions, etc\.

        public bool IsActive \{ get; set; \} = true;

        public DateTime CreatedAt \{ get; set; \} = DateTime\.UtcNow;

        public DateTime? UpdatedAt \{ get; set; \}

    \}

\}

### <a id="_Toc209713938"></a>Microservice za Layout komponente

// Services/LayoutService\.cs

using DynUI\.Models\.UI;

using DynUI\.Data\.Entities;

using Microsoft\.EntityFrameworkCore;

using System\.Text\.Json;

namespace DynUI\.Services

\{

    public interface ILayoutService

    \{

        Task<PageConfigDto> GetPageLayoutAsync\(string route\);

        Task<PageConfigDto> SavePageLayoutAsync\(PageConfigDto config\);

        Task<GridConfigDto> GetGridConfigAsync\(int gridId\);

        Task<List<Dictionary<string, object>>> GetGridDataAsync\(int gridId, GridDataRequest request\);

        Task<object> ExecuteGridActionAsync\(int gridId, string actionName, Dictionary<string, object> parameters\);

    \}

    public class LayoutService : ILayoutService

    \{

        private readonly DynUIDbContext \_context;

        private readonly ILogger<LayoutService> \_logger;

        private readonly ICacheService \_cacheService;

        private readonly IDataSourceService \_dataSourceService;

        public LayoutService\(

            DynUIDbContext context,

            ILogger<LayoutService> logger,

            ICacheService cacheService,

            IDataSourceService dataSourceService\)

        \{

            \_context = context;

            \_logger = logger;

            \_cacheService = cacheService;

            \_dataSourceService = dataSourceService;

        \}

        public async Task<PageConfigDto> GetPageLayoutAsync\(string route\)

        \{

            var cacheKey = $"page\_layout\_\{route\}";

            var cached = await \_cacheService\.GetAsync<PageConfigDto>\(cacheKey\);

            if \(cached \!= null\) return cached;

            var pageLayout = await \_context\.PageLayouts

                \.Include\(p => p\.Containers\)

                    \.ThenInclude\(c => c\.Components\)

                \.Include\(p => p\.Breadcrumbs\)

                \.FirstOrDefaultAsync\(p => p\.Route == route && p\.IsActive\);

            if \(pageLayout == null\)

                throw new NotFoundException\($"Page layout not found for route: \{route\}"\);

            var config = MapPageLayoutToDto\(pageLayout\);

            await \_cacheService\.SetAsync\(cacheKey, config, TimeSpan\.FromMinutes\(15\)\);

            return config;

        \}

        public async Task<PageConfigDto> SavePageLayoutAsync\(PageConfigDto config\)

        \{

            using var transaction = await \_context\.Database\.BeginTransactionAsync\(\);

            try

            \{

                var pageLayout = new PageLayoutEntity

                \{

                    Name = config\.Title ?? "Unnamed Page",

                    Route = GenerateRouteFromTitle\(config\.Title\),

                    Title = config\.Title,

                    Subtitle = config\.Subtitle,

                    WithMenu = config\.WithMenu

                \};

                \_context\.PageLayouts\.Add\(pageLayout\);

                await \_context\.SaveChangesAsync\(\);

                // Add breadcrumbs

                foreach \(var \(breadcrumb, index\) in config\.Breadcrumb\.Select\(\(b, i\) => \(b, i\)\)\)

                \{

                    \_context\.Breadcrumbs\.Add\(new BreadcrumbEntity

                    \{

                        PageLayoutId = pageLayout\.Id,

                        Label = breadcrumb\.Label,

                        Link = breadcrumb\.Link,

                        Order = index

                    \}\);

                \}

                // Add containers

                foreach \(var \(container, index\) in config\.Containers\.Select\(\(c, i\) => \(c, i\)\)\)

                \{

                    \_context\.Containers\.Add\(new ContainerEntity

                    \{

                        PageLayoutId = pageLayout\.Id,

                        Title = container\.Title,

                        Height = container\.Height,

                        NoBorder = container\.NoBorder,

                        NoPadding = container\.NoPadding,

                        Order = index,

                        Configuration = JsonSerializer\.Serialize\(container\)

                    \}\);

                \}

                await \_context\.SaveChangesAsync\(\);

                await transaction\.CommitAsync\(\);

                // Clear cache

                await \_cacheService\.RemoveByPatternAsync\("page\_layout\_\*"\);

                return config;

            \}

            catch

            \{

                await transaction\.RollbackAsync\(\);

                throw;

            \}

        \}

        public async Task<GridConfigDto> GetGridConfigAsync\(int gridId\)

        \{

            var gridDef = await \_context\.GridDefinitions\.FindAsync\(gridId\);

            if \(gridDef == null\) throw new NotFoundException\($"Grid \{gridId\} not found"\);

            var config = JsonSerializer\.Deserialize<GridConfigDto>\(gridDef\.Configuration\)\!;

            config\.DataEndpoint = $"/api/v1/grid/\{gridId\}/data";

            return config;

        \}

        public async Task<List<Dictionary<string, object>>> GetGridDataAsync\(int gridId, GridDataRequest request\)

        \{

            var gridDef = await \_context\.GridDefinitions\.FindAsync\(gridId\);

            if \(gridDef == null\) throw new NotFoundException\($"Grid \{gridId\} not found"\);

            return await \_dataSourceService\.GetDataAsync\(gridDef\.DataSource, request\);

        \}

        public async Task<object> ExecuteGridActionAsync\(int gridId, string actionName, Dictionary<string, object> parameters\)

        \{

            var gridConfig = await GetGridConfigAsync\(gridId\);

            var action = gridConfig\.Actions\.FirstOrDefault\(a => a\.Label == actionName\);

            if \(action == null\) throw new NotFoundException\($"Action \{actionName\} not found"\);

            return await \_dataSourceService\.ExecuteActionAsync\(action\.ActionEndpoint, parameters\);

        \}

        // Mapping methods

        private PageConfigDto MapPageLayoutToDto\(PageLayoutEntity entity\)

        \{

            return new PageConfigDto

            \{

                Title = entity\.Title,

                Subtitle = entity\.Subtitle,

                WithMenu = entity\.WithMenu,

                Breadcrumb = entity\.Breadcrumbs

                    \.OrderBy\(b => b\.Order\)

                    \.Select\(b => new BreadcrumbItemDto \{ Label = b\.Label, Link = b\.Link \}\)

                    \.ToList\(\),

                Containers = entity\.Containers

                    \.OrderBy\(c => c\.Order\)

                    \.Select\(c => JsonSerializer\.Deserialize<ContainerConfigDto>\(c\.Configuration\)\!\)

                    \.ToList\(\)

            \};

        \}

        private string GenerateRouteFromTitle\(string? title\)

        \{

            if \(string\.IsNullOrEmpty\(title\)\) return Guid\.NewGuid\(\)\.ToString\(\);

            return title\.ToLowerInvariant\(\)

                       \.Replace\(" ", "\-"\)

                       \.Replace\("\.", ""\)

                       \.Replace\(",", ""\);

        \}

    \}

    public class GridDataRequest

    \{

        public int Page \{ get; set; \} = 1;

        public int PageSize \{ get; set; \} = 10;

        public string? Search \{ get; set; \}

        public string? SortColumn \{ get; set; \}

        public string? SortDirection \{ get; set; \}

        public Dictionary<string, object> Filters \{ get; set; \} = new\(\);

    \}

\}

### <a id="_Toc209713939"></a>CSS stilovi za Layout komponente

// styles/components/\_dyn\-layout\-components\.scss

// Container Styles

\.dyn\-container \{

  \-\-padding: var\(\-\-spacing\-sm, 16px\);

  \-\-border\-radius: var\(\-\-border\-radius\-md, 4px\);

  \-\-border\-width: var\(\-\-border\-width\-sm, 1px\);

  \-\-border\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \-\-background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  position: relative;

  background\-color: var\(\-\-background\);

  border: var\(\-\-border\-width\) solid var\(\-\-border\-color\);

  border\-radius: var\(\-\-border\-radius\);

  box\-shadow: 0 2px 4px rgba\(0, 0, 0, 0\.1\);

  &\-no\-border \{

    border: none;

    box\-shadow: none;

  \}

  &\-header \{

    padding: var\(\-\-padding\) var\(\-\-padding\) 0;

  \}

  &\-title \{

    \-\-font\-family: var\(\-\-font\-family\-theme, system\-ui\);

    \-\-line\-weight: var\(\-\-font\-weight\-semibold, 600\);

    \-\-line\-height: var\(\-\-line\-height\-md, 1\.5\);

    \-\-text\-color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    \-\-font\-size: 1\.125rem;

    \-\-letter\-spacing: 0\.017rem;

    \-\-margin: 0 0 var\(\-\-spacing\-xs, 8px\);

    font\-family: var\(\-\-font\-family\);

    font\-weight: var\(\-\-line\-weight\);

    font\-size: var\(\-\-font\-size\);

    line\-height: var\(\-\-line\-height\);

    letter\-spacing: var\(\-\-letter\-spacing\);

    color: var\(\-\-text\-color\);

    margin: var\(\-\-margin\);

  \}

  &\-content \{

    padding: var\(\-\-padding\);

  \}

  &\-no\-padding &\-content \{

    padding: 0;

  \}

  &\-no\-padding &\-header \{

    padding: 0 0 var\(\-\-spacing\-xs, 8px\);

  \}

\}

// Divider Styles

\.dyn\-divider \{

  \-\-color: var\(\-\-color\-neutral\-mid\-40, \#999\);

  \-\-stroke\-linecap: round;

  position: relative;

  margin: 1rem 0;

  width: 100%;

  &\-svg \{

    width: 100%;

    height: 1px;

  \}

  &\-svg\-line \{

    stroke: var\(\-\-color\);

    stroke\-linecap: var\(\-\-stroke\-linecap\);

  \}

  &\-small &\-svg\-line \{ stroke\-width: 1; \}

  &\-medium &\-svg\-line \{ stroke\-width: 2; \}

  &\-large &\-svg\-line \{ stroke\-width: 3; \}

  &\-with\-label \{

    display: flex;

    align\-items: center;

    text\-align: center;

  \}

  &\-content \{

    display: flex;

    align\-items: center;

    width: 100%;

  \}

  &\-line \{

    flex: 1;

    height: 1px;

    background\-color: var\(\-\-color\);

    &\-left \{ margin\-right: 1rem; \}

    &\-right \{ margin\-left: 1rem; \}

  \}

  &\-label \{

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-size: 0\.875rem;

    font\-weight: 500;

    white\-space: nowrap;

  \}

\}

// Grid Styles

\.dyn\-grid \{

  \-\-grid\-border\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \-\-grid\-header\-bg: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

  \-\-grid\-row\-hover: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

  \-\-grid\-row\-striped: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

  width: 100%;

  overflow: hidden;

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  &\-container \{

    overflow\-x: auto;

  \}

  &\-table \{

    width: 100%;

    border\-collapse: collapse;

    font\-size: 0\.875rem;

  \}

  &\-bordered &\-table \{

    border: 1px solid var\(\-\-grid\-border\-color\);

  \}

  &\-header \{

    background\-color: var\(\-\-grid\-header\-bg\);

    &\-cell \{

      padding: 0\.75rem;

      text\-align: left;

      font\-weight: 600;

      border\-bottom: 2px solid var\(\-\-grid\-border\-color\);

      position: relative;

    \}

    &\-content \{

      display: flex;

      align\-items: center;

      justify\-content: space\-between;

    \}

  \}

  &\-sortable \{

    cursor: pointer;

    user\-select: none;

    &:hover \{

      background\-color: var\(\-\-grid\-row\-hover\);

    \}

  \}

  &\-sort\-icons \{

    display: flex;

    flex\-direction: column;

    margin\-left: 0\.5rem;

    opacity: 0\.5;

    \.dyn\-icon \{

      font\-size: 0\.75rem;

      line\-height: 1;

    \}

  \}

  &\-sort\-active \.dyn\-icon \{

    opacity: 1;

    color: var\(\-\-color\-action\-default, \#0066cc\);

  \}

  &\-body \{

    \.dyn\-grid\-row \{

      border\-bottom: 1px solid var\(\-\-grid\-border\-color\);

      &:last\-child \{

        border\-bottom: none;

      \}

    \}

  \}

  &\-hover &\-row:hover \{

    background\-color: var\(\-\-grid\-row\-hover\);

  \}

  &\-striped &\-row:nth\-child\(even\) \{

    background\-color: var\(\-\-grid\-row\-striped\);

  \}

  &\-row\-clickable \{

    cursor: pointer;

  \}

  &\-cell \{

    padding: 0\.75rem;

    vertical\-align: middle;

    &\.dyn\-grid\-actions\-cell \{

      text\-align: center;

      width: 1%;

      white\-space: nowrap;

    \}

  \}

  &\-actions \{

    display: flex;

    gap: 0\.25rem;

    justify\-content: center;

  \}

  &\-spacing\-small &\-header\-cell,

  &\-spacing\-small &\-cell \{

    padding: 0\.5rem;

  \}

  &\-spacing\-large &\-header\-cell,

  &\-spacing\-large &\-cell \{

    padding: 1rem;

  \}

  // Loading and Empty states

  &\-loading\-container,

  &\-empty \{

    display: flex;

    flex\-direction: column;

    align\-items: center;

    justify\-content: center;

    padding: 3rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \}

  &\-loading\-spinner \{

    width: 2rem;

    height: 2rem;

    border: 3px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    border\-top: 3px solid var\(\-\-color\-action\-default, \#0066cc\);

    border\-radius: 50%;

    animation: spin 1s linear infinite;

    margin\-bottom: 1rem;

  \}

  &\-empty \.dyn\-icon \{

    font\-size: 3rem;

    margin\-bottom: 1rem;

    opacity: 0\.5;

  \}

\}

// Page Styles

\.dyn\-page \{

  min\-height: 100vh;

  display: flex;

  flex\-direction: column;

  &\-with\-menu \{

    margin\-left: 0; // Will be adjusted by menu component

  \}

  &\-header \{

    background\-color: var\(\-\-color\-neutral\-light\-00, \#fff\);

    border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    padding: 1rem 2rem;

  \}

  &\-breadcrumb \{

    margin\-bottom: 1rem;

    &\-list \{

      display: flex;

      align\-items: center;

      list\-style: none;

      margin: 0;

      padding: 0;

      font\-size: 0\.875rem;

    \}

    &\-item \{

      display: flex;

      align\-items: center;

    \}

    &\-link \{

      color: var\(\-\-color\-action\-default, \#0066cc\);

      text\-decoration: none;

      &:hover \{

        text\-decoration: underline;

      \}

    \}

    &\-current \{

      color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    \}

    &\-separator \{

      margin: 0 0\.5rem;

      color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    \}

  \}

  &\-header\-content \{

    display: flex;

    justify\-content: space\-between;

    align\-items: flex\-start;

    gap: 2rem;

  \}

  &\-header\-text \{

    flex: 1;

  \}

  &\-title \{

    font\-size: 1\.75rem;

    font\-weight: 700;

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    margin: 0 0 0\.5rem;

  \}

  &\-subtitle \{

    font\-size: 1rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    margin: 0;

  \}

  &\-header\-actions \{

    display: flex;

    gap: 0\.75rem;

    flex\-shrink: 0;

  \}

  &\-content \{

    flex: 1;

    padding: 2rem;

    background\-color: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

  \}

\}

@keyframes spin \{

  0% \{ transform: rotate\(0deg\); \}

  100% \{ transform: rotate\(360deg\); \}

\}

// Responsive

@media \(max\-width: 768px\) \{

  \.dyn\-page\-header \{

    padding: 1rem;

  \}

  \.dyn\-page\-header\-content \{

    flex\-direction: column;

    align\-items: stretch;

    gap: 1rem;

  \}

  \.dyn\-page\-content \{

    padding: 1rem;

  \}

  \.dyn\-grid\-container \{

    overflow\-x: auto;

  \}

  \.dyn\-grid\-actions \{

    flex\-direction: column;

  \}

\}

Ovom implementacijom pokrivam kompletan set Layout komponenti koji omogu─çavaju kreiranje strukturiranih i profesionalnih korisni─ìkih interfejsa:

1. \*\*Container\*\*: Fleksibilan kontejner za grupovanje sadr┼╛aja
2. \*\*Divider\*\*: Vizuelni separator sa opcionalnim labelom
3. \*\*Grid\*\*: Napredna tabela sa sortiranjem, akcijama i paginacijom
4. \*\*Page\*\*: Kompletna page struktura sa header, breadcrumb i content

Komponente su optimizovane za enterprise aplikacije i podr┼╛avaju responsive dizajn\. ┼╜elite li da nastavim sa slede─çom grupom komponenti ili da detaljnije razradim neki aspekt ovih Layout komponenti?

## <a id="_Toc209713940"></a>Grupa 4: Interakcijske komponente \(Modal, Popup, Dropdown, Accordion\)

### <a id="_Toc209713941"></a>DYNModal \- Implementacija u React/TypeScript

#### <a id="_Toc209713942"></a>Angular interface:

interface DynModalProps \{

  title?: string;

  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';

  hideClose?: boolean;

  clickOut?: boolean;

  componentsSize?: 'small' | 'medium';

  icon?: string | TemplateRef<void>;

  primaryAction?: DynModalAction;

  secondaryAction?: DynModalAction;

  onClose?: \(\) => void;

\}

interface DynModalAction \{

  action: Function;

  danger?: boolean;

  disabled?: boolean;

  label: string;

  loading?: boolean;

\}

#### <a id="_Toc209713943"></a>React/TypeScript implementacija:

// types/modal\.types\.ts

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'auto';

export type ComponentSize = 'small' | 'medium';

export interface ModalAction \{

  action: \(\) => void | Promise<void>;

  danger?: boolean;

  disabled?: boolean;

  label: string;

  loading?: boolean;

\}

export interface DynModalProps \{

  title?: string;

  size?: ModalSize;

  hideClose?: boolean;

  clickOut?: boolean;

  componentsSize?: ComponentSize;

  icon?: string | React\.ReactNode;

  primaryAction?: ModalAction;

  secondaryAction?: ModalAction;

  children?: React\.ReactNode;

  className?: string;

  onClose?: \(\) => void;

  open?: boolean;

\}

export interface DynModalRef \{

  open\(\): void;

  close\(\): void;

\}

// components/DynModal\.tsx

import React, \{ 

  forwardRef, 

  useImperativeHandle, 

  useState, 

  useEffect, 

  useCallback,

  useRef

\} from 'react';

import classNames from 'classnames';

import \{ createPortal \} from 'react\-dom';

import \{ DynModalProps, DynModalRef \} from '\.\./types/modal\.types';

import \{ DynButton \} from '\./DynButton';

import \{ DynIcon \} from '\./DynIcon';

const DynModal = forwardRef<DynModalRef, DynModalProps>\(\(\{

  title,

  size = 'md',

  hideClose = false,

  clickOut = false,

  componentsSize = 'medium',

  icon,

  primaryAction,

  secondaryAction,

  children,

  className,

  onClose,

  open: controlledOpen

\}, ref\) => \{

  const \[isOpen, setIsOpen\] = useState\(controlledOpen || false\);

  const modalRef = useRef<HTMLDivElement>\(null\);

  const previousFocusRef = useRef<HTMLElement | null>\(null\);

  useImperativeHandle\(ref, \(\) => \(\{

    open\(\) \{

      previousFocusRef\.current = document\.activeElement as HTMLElement;

      setIsOpen\(true\);

    \},

    close\(\) \{

      handleClose\(\);

    \}

  \}\)\);

  useEffect\(\(\) => \{

    if \(controlledOpen \!== undefined\) \{

      setIsOpen\(controlledOpen\);

    \}

  \}, \[controlledOpen\]\);

  const handleClose = useCallback\(\(fromX = false\) => \{

    setIsOpen\(false\);

    onClose?\.\(\);

    // Restore focus

    if \(previousFocusRef\.current\) \{

      previousFocusRef\.current\.focus\(\);

    \}

  \}, \[onClose\]\);

  const handleOverlayClick = useCallback\(\(e: React\.MouseEvent\) => \{

    if \(clickOut && e\.target === e\.currentTarget\) \{

      handleClose\(\);

    \}

  \}, \[clickOut, handleClose\]\);

  const handleKeyDown = useCallback\(\(e: KeyboardEvent\) => \{

    if \(e\.key === 'Escape' && \!hideClose\) \{

      handleClose\(\);

    \}

  \}, \[hideClose, handleClose\]\);

  useEffect\(\(\) => \{

    if \(isOpen\) \{

      document\.addEventListener\('keydown', handleKeyDown\);

      document\.body\.style\.overflow = 'hidden';

      // Focus trap

      const focusableElements = modalRef\.current?\.querySelectorAll\(

        'button, \[href\], input, select, textarea, \[tabindex\]:not\(\[tabindex="\-1"\]\)'

      \);

      const firstElement = focusableElements?\.\[0\] as HTMLElement;

      firstElement?\.focus\(\);

    \} else \{

      document\.removeEventListener\('keydown', handleKeyDown\);

      document\.body\.style\.overflow = '';

    \}

    return \(\) => \{

      document\.removeEventListener\('keydown', handleKeyDown\);

      document\.body\.style\.overflow = '';

    \};

  \}, \[isOpen, handleKeyDown\]\);

  const validatedPrimaryAction = \{

    action: primaryAction?\.action || handleClose,

    label: primaryAction?\.label || 'Fechar',

    \.\.\.primaryAction

  \};

  const modalClasses = classNames\(

    'dyn\-modal',

    \`dyn\-modal\-$\{size\}\`,

    \`dyn\-modal\-components\-$\{componentsSize\}\`,

    \{

      'dyn\-modal\-no\-close': hideClose

    \},

    className

  \);

  const renderHeader = \(\) => \(

    <div className="dyn\-modal\-header">

      <div className="dyn\-modal\-title\-container">

        \{icon && \(

          <div className="dyn\-modal\-icon">

            \{typeof icon === 'string' ? <DynIcon icon=\{icon\} /> : icon\}

          </div>

        \)\}

        \{title && <h2 className="dyn\-modal\-title">\{title\}</h2>\}

      </div>

      \{\!hideClose && \(

        <button

          className="dyn\-modal\-close"

          onClick=\{\(\) => handleClose\(true\)\}

          aria\-label="Fechar modal"

        >

          <DynIcon icon="dyn\-icon\-close" />

        </button>

      \)\}

    </div>

  \);

  const renderFooter = \(\) => \{

    if \(\!primaryAction && \!secondaryAction\) return null;

    return \(

      <div className="dyn\-modal\-footer">

        <div className="dyn\-modal\-actions">

          \{secondaryAction && \(

            <DynButton

              label=\{secondaryAction\.label\}

              kind="secondary"

              disabled=\{secondaryAction\.disabled\}

              loading=\{secondaryAction\.loading\}

              onClick=\{secondaryAction\.action\}

            />

          \)\}

          \{validatedPrimaryAction && \(

            <DynButton

              label=\{validatedPrimaryAction\.label\}

              kind="primary"

              danger=\{validatedPrimaryAction\.danger\}

              disabled=\{validatedPrimaryAction\.disabled\}

              loading=\{validatedPrimaryAction\.loading\}

              onClick=\{validatedPrimaryAction\.action\}

            />

          \)\}

        </div>

      </div>

    \);

  \};

  if \(\!isOpen\) return null;

  return createPortal\(

    <div 

      className="dyn\-modal\-overlay" 

      onClick=\{handleOverlayClick\}

      role="dialog"

      aria\-modal="true"

      aria\-labelledby=\{title ? "modal\-title" : undefined\}

    >

      <div ref=\{modalRef\} className=\{modalClasses\}>

        \{\(title || icon || \!hideClose\) && renderHeader\(\)\}

        <div className="dyn\-modal\-body">

          \{children\}

        </div>

        \{renderFooter\(\)\}

      </div>

    </div>,

    document\.body

  \);

\}\);

DynModal\.displayName = 'DynModal';

export default DynModal;

### <a id="_Toc209713944"></a>DYNPopup \- Implementacija u React/TypeScript

// types/popup\.types\.ts

export type PopupPosition = 

  | 'right' | 'right\-bottom' | 'right\-top'

  | 'bottom' | 'bottom\-left' | 'bottom\-right'

  | 'left' | 'left\-top' | 'left\-bottom'

  | 'top' | 'top\-right' | 'top\-left';

export interface PopupAction \{

  label: string;

  action: \(\) => void;

  icon?: string;

  disabled?: boolean;

  visible?: boolean;

  separator?: boolean;

\}

export interface DynPopupProps \{

  actions: PopupAction\[\];

  target?: HTMLElement | React\.RefObject<HTMLElement>;

  position?: PopupPosition;

  customPositions?: PopupPosition\[\];

  hideArrow?: boolean;

  isCornerAlign?: boolean;

  size?: ComponentSize;

  className?: string;

  onClose?: \(\) => void;

  onClickItem?: \(action: PopupAction\) => void;

\}

export interface DynPopupRef \{

  open\(\): void;

  close\(\): void;

  toggle\(\): void;

\}

// components/DynPopup\.tsx

import React, \{ 

  forwardRef, 

  useImperativeHandle, 

  useState, 

  useEffect, 

  useRef,

  useCallback

\} from 'react';

import classNames from 'classnames';

import \{ createPortal \} from 'react\-dom';

import \{ DynPopupProps, DynPopupRef, PopupPosition \} from '\.\./types/popup\.types';

import \{ DynIcon \} from '\./DynIcon';

const DynPopup = forwardRef<DynPopupRef, DynPopupProps>\(\(\{

  actions = \[\],

  target,

  position = 'bottom\-left',

  customPositions = \[\],

  hideArrow = false,

  isCornerAlign = false,

  size = 'medium',

  className,

  onClose,

  onClickItem

\}, ref\) => \{

  const \[isOpen, setIsOpen\] = useState\(false\);

  const \[currentPosition, setCurrentPosition\] = useState<PopupPosition>\(position\);

  const \[arrowDirection, setArrowDirection\] = useState\('top\-left'\);

  const popupRef = useRef<HTMLDivElement>\(null\);

  useImperativeHandle\(ref, \(\) => \(\{

    open\(\) \{

      setIsOpen\(true\);

    \},

    close\(\) \{

      setIsOpen\(false\);

      onClose?\.\(\);

    \},

    toggle\(\) \{

      setIsOpen\(prev => \!prev\);

      if \(\!isOpen\) \{

        calculatePosition\(\);

      \}

    \}

  \}\)\);

  const getTargetElement = \(\): HTMLElement | null => \{

    if \(\!target\) return null;

    if \('current' in target\) \{

      return target\.current;

    \}

    return target as HTMLElement;

  \};

  const calculatePosition = useCallback\(\(\) => \{

    const targetEl = getTargetElement\(\);

    const popupEl = popupRef\.current;

    if \(\!targetEl || \!popupEl\) return;

    const targetRect = targetEl\.getBoundingClientRect\(\);

    const popupRect = popupEl\.getBoundingClientRect\(\);

    const viewportWidth = window\.innerWidth;

    const viewportHeight = window\.innerHeight;

    const positions = customPositions\.length > 0 

      ? \[position, \.\.\.customPositions\]

      : \[position, 'bottom\-left', 'bottom\-right', 'top\-left', 'top\-right', 'left', 'right'\];

    let bestPosition = position;

    let bestArrow = 'top\-left';

    for \(const pos of positions\) \{

      const coords = getPositionCoordinates\(pos, targetRect, popupRect, isCornerAlign\);

      if \(coords\.left >= 0 && 

          coords\.top >= 0 && 

          coords\.left \+ popupRect\.width <= viewportWidth &&

          coords\.top \+ popupRect\.height <= viewportHeight\) \{

        bestPosition = pos;

        bestArrow = getArrowDirection\(pos\);

        break;

      \}

    \}

    setCurrentPosition\(bestPosition\);

    setArrowDirection\(bestArrow\);

  \}, \[position, customPositions, isCornerAlign\]\);

  const getPositionCoordinates = \(

    pos: PopupPosition, 

    targetRect: DOMRect, 

    popupRect: DOMRect,

    cornerAlign: boolean

  \) => \{

    let left = 0, top = 0;

    switch \(pos\) \{

      case 'bottom\-left':

        left = cornerAlign ? targetRect\.left : targetRect\.left;

        top = targetRect\.bottom \+ 8;

        break;

      case 'bottom\-right':

        left = cornerAlign ? targetRect\.right \- popupRect\.width : targetRect\.right \- popupRect\.width;

        top = targetRect\.bottom \+ 8;

        break;

      case 'top\-left':

        left = cornerAlign ? targetRect\.left : targetRect\.left;

        top = targetRect\.top \- popupRect\.height \- 8;

        break;

      case 'top\-right':

        left = cornerAlign ? targetRect\.right \- popupRect\.width : targetRect\.right \- popupRect\.width;

        top = targetRect\.top \- popupRect\.height \- 8;

        break;

      case 'left':

        left = targetRect\.left \- popupRect\.width \- 8;

        top = targetRect\.top \+ \(targetRect\.height \- popupRect\.height\) / 2;

        break;

      case 'right':

        left = targetRect\.right \+ 8;

        top = targetRect\.top \+ \(targetRect\.height \- popupRect\.height\) / 2;

        break;

      // Add more cases as needed

    \}

    return \{ left, top \};

  \};

  const getArrowDirection = \(pos: PopupPosition\): string => \{

    const directions = \{

      'bottom\-left': 'top\-left',

      'bottom\-right': 'top\-right',

      'top\-left': 'bottom\-left',

      'top\-right': 'bottom\-right',

      'left': 'right',

      'right': 'left'

    \};

    return directions\[pos\] || 'top\-left';

  \};

  useEffect\(\(\) => \{

    if \(isOpen\) \{

      calculatePosition\(\);

      const handleClickOutside = \(event: MouseEvent\) => \{

        const targetEl = getTargetElement\(\);

        if \(popupRef\.current && 

            \!popupRef\.current\.contains\(event\.target as Node\) &&

            targetEl && 

            \!targetEl\.contains\(event\.target as Node\)\) \{

          setIsOpen\(false\);

          onClose?\.\(\);

        \}

      \};

      const handleResize = \(\) => calculatePosition\(\);

      document\.addEventListener\('mousedown', handleClickOutside\);

      window\.addEventListener\('resize', handleResize\);

      return \(\) => \{

        document\.removeEventListener\('mousedown', handleClickOutside\);

        window\.removeEventListener\('resize', handleResize\);

      \};

    \}

  \}, \[isOpen, calculatePosition, onClose\]\);

  const handleActionClick = \(action: PopupAction\) => \{

    if \(\!action\.disabled\) \{

      action\.action\(\);

      onClickItem?\.\(action\);

      setIsOpen\(false\);

      onClose?\.\(\);

    \}

  \};

  const popupClasses = classNames\(

    'dyn\-popup',

    \`dyn\-popup\-$\{size\}\`,

    \`dyn\-popup\-$\{currentPosition\}\`,

    \{

      'dyn\-popup\-no\-arrow': hideArrow,

      'dyn\-popup\-corner\-align': isCornerAlign

    \},

    className

  \);

  if \(\!isOpen\) return null;

  const targetEl = getTargetElement\(\);

  if \(\!targetEl\) return null;

  const targetRect = targetEl\.getBoundingClientRect\(\);

  const coords = getPositionCoordinates\(currentPosition, targetRect, \{ width: 200, height: 100 \}, isCornerAlign\);

  return createPortal\(

    <div 

      ref=\{popupRef\}

      className=\{popupClasses\}

      style=\{\{

        position: 'fixed',

        left: coords\.left,

        top: coords\.top,

        zIndex: 9999

      \}\}

    >

      \{\!hideArrow && \(

        <div className=\{\`dyn\-popup\-arrow dyn\-popup\-arrow\-$\{arrowDirection\}\`\} />

      \)\}

      <div className="dyn\-popup\-content">

        <ul className="dyn\-popup\-list">

          \{actions\.filter\(action => action\.visible \!== false\)\.map\(\(action, index\) => \(

            <React\.Fragment key=\{index\}>

              \{action\.separator && <li className="dyn\-popup\-separator" />\}

              <li 

                className=\{classNames\('dyn\-popup\-item', \{

                  'dyn\-popup\-item\-disabled': action\.disabled

                \}\)\}

                onClick=\{\(\) => handleActionClick\(action\)\}

              >

                \{action\.icon && <DynIcon icon=\{action\.icon\} />\}

                <span className="dyn\-popup\-item\-label">\{action\.label\}</span>

              </li>

            </React\.Fragment>

          \)\)\}

        </ul>

      </div>

    </div>,

    document\.body

  \);

\}\);

DynPopup\.displayName = 'DynPopup';

export default DynPopup;

### <a id="_Toc209713945"></a>DYNDropdown \- Implementacija u React/TypeScript

// types/dropdown\.types\.ts

export interface DropdownAction \{

  label: string;

  action?: \(\) => void;

  url?: string;

  icon?: string;

  disabled?: boolean;

  visible?: boolean;

  separator?: boolean;

\}

export interface DynDropdownProps \{

  label?: string;

  actions: DropdownAction\[\];

  disabled?: boolean;

  size?: ComponentSize;

  className?: string;

\}

// components/DynDropdown\.tsx

import React, \{ useState, useRef, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynDropdownProps \} from '\.\./types/dropdown\.types';

import \{ DynIcon \} from '\./DynIcon';

const DynDropdown: React\.FC<DynDropdownProps> = \(\{

  label,

  actions = \[\],

  disabled = false,

  size = 'medium',

  className

\}\) => \{

  const \[isOpen, setIsOpen\] = useState\(false\);

  const dropdownRef = useRef<HTMLDivElement>\(null\);

  const buttonRef = useRef<HTMLButtonElement>\(null\);

  useEffect\(\(\) => \{

    const handleClickOutside = \(event: MouseEvent\) => \{

      if \(dropdownRef\.current && \!dropdownRef\.current\.contains\(event\.target as Node\)\) \{

        setIsOpen\(false\);

      \}

    \};

    if \(isOpen\) \{

      document\.addEventListener\('mousedown', handleClickOutside\);

    \}

    return \(\) => \{

      document\.removeEventListener\('mousedown', handleClickOutside\);

    \};

  \}, \[isOpen\]\);

  const handleToggle = \(\) => \{

    if \(\!disabled\) \{

      setIsOpen\(prev => \!prev\);

    \}

  \};

  const handleActionClick = \(action: DropdownAction\) => \{

    if \(\!action\.disabled\) \{

      if \(action\.action\) \{

        action\.action\(\);

      \} else if \(action\.url\) \{

        window\.location\.href = action\.url;

      \}

      setIsOpen\(false\);

    \}

  \};

  const handleKeyDown = \(event: React\.KeyboardEvent\) => \{

    switch \(event\.key\) \{

      case 'Enter':

      case ' ':

        event\.preventDefault\(\);

        handleToggle\(\);

        break;

      case 'Escape':

        setIsOpen\(false\);

        buttonRef\.current?\.focus\(\);

        break;

      case 'ArrowDown':

        if \(\!isOpen\) \{

          setIsOpen\(true\);

        \}

        break;

    \}

  \};

  const dropdownClasses = classNames\(

    'dyn\-dropdown',

    \`dyn\-dropdown\-$\{size\}\`,

    \{

      'dyn\-dropdown\-open': isOpen,

      'dyn\-dropdown\-disabled': disabled

    \},

    className

  \);

  const visibleActions = actions\.filter\(action => action\.visible \!== false\);

  return \(

    <div ref=\{dropdownRef\} className=\{dropdownClasses\}>

      <button

        ref=\{buttonRef\}

        className="dyn\-dropdown\-button"

        disabled=\{disabled\}

        onClick=\{handleToggle\}

        onKeyDown=\{handleKeyDown\}

        aria\-expanded=\{isOpen\}

        aria\-haspopup="true"

      >

        <span className="dyn\-dropdown\-label">\{label || 'Dropdown'\}</span>

        <DynIcon 

          icon="dyn\-icon\-arrow\-down" 

          className=\{classNames\('dyn\-dropdown\-arrow', \{

            'dyn\-dropdown\-arrow\-up': isOpen

          \}\)\}

        />

      </button>

      \{isOpen && \(

        <div className="dyn\-dropdown\-content">

          <ul className="dyn\-dropdown\-list" role="menu">

            \{visibleActions\.map\(\(action, index\) => \(

              <React\.Fragment key=\{index\}>

                \{action\.separator && <li className="dyn\-dropdown\-separator" />\}

                <li 

                  className=\{classNames\('dyn\-dropdown\-item', \{

                    'dyn\-dropdown\-item\-disabled': action\.disabled

                  \}\)\}

                  role="menuitem"

                  onClick=\{\(\) => handleActionClick\(action\)\}

                >

                  \{action\.icon && <DynIcon icon=\{action\.icon\} />\}

                  <span className="dyn\-dropdown\-item\-label">\{action\.label\}</span>

                </li>

              </React\.Fragment>

            \)\)\}

          </ul>

        </div>

      \)\}

    </div>

  \);

\};

export default DynDropdown;

### <a id="_Toc209713946"></a>DYNAccordion \- Implementacija u React/TypeScript

// types/accordion\.types\.ts

export interface AccordionLiterals \{

  closeAllItems: string;

  expandAllItems: string;

\}

export interface DynAccordionItemProps \{

  label: string;

  disabled?: boolean;

  expanded?: boolean;

  children?: React\.ReactNode;

  className?: string;

  onExpand?: \(expanded: boolean\) => void;

\}

export interface DynAccordionProps \{

  showManagerAccordion?: boolean;

  allowExpandItems?: boolean;

  literals?: Partial<AccordionLiterals>;

  children?: React\.ReactNode;

  className?: string;

  onExpandAll?: \(\) => void;

  onCollapseAll?: \(\) => void;

\}

export interface DynAccordionRef \{

  expandAllItems\(\): void;

  collapseAllItems\(\): void;

\}

// components/DynAccordion\.tsx

import React, \{ 

  forwardRef, 

  useImperativeHandle, 

  useState, 

  useContext,

  createContext,

  Children,

  cloneElement,

  isValidElement

\} from 'react';

import classNames from 'classnames';

import \{ DynAccordionProps, DynAccordionRef, AccordionLiterals \} from '\.\./types/accordion\.types';

import \{ DynButton \} from '\./DynButton';

const defaultLiterals: AccordionLiterals = \{

  closeAllItems: 'Fechar todos os itens',

  expandAllItems: 'Abrir todos os itens'

\};

interface AccordionContextType \{

  allowMultiple: boolean;

  expandedItems: Set<number>;

  toggleItem: \(index: number, force?: boolean\) => void;

\}

const AccordionContext = createContext<AccordionContextType | null>\(null\);

const DynAccordion = forwardRef<DynAccordionRef, DynAccordionProps>\(\(\{

  showManagerAccordion = false,

  allowExpandItems = false,

  literals: customLiterals = \{\},

  children,

  className,

  onExpandAll,

  onCollapseAll

\}, ref\) => \{

  const \[expandedItems, setExpandedItems\] = useState<Set<number>>\(new Set\(\)\);

  const literals = \{ \.\.\.defaultLiterals, \.\.\.customLiterals \};

  const allowMultiple = showManagerAccordion || allowExpandItems;

  useImperativeHandle\(ref, \(\) => \(\{

    expandAllItems\(\) \{

      const childrenArray = Children\.toArray\(children\);

      const allIndices = new Set\(childrenArray\.map\(\(\_, index\) => index\)\);

      setExpandedItems\(allIndices\);

      onExpandAll?\.\(\);

    \},

    collapseAllItems\(\) \{

      setExpandedItems\(new Set\(\)\);

      onCollapseAll?\.\(\);

    \}

  \}\)\);

  const toggleItem = \(index: number, force?: boolean\) => \{

    setExpandedItems\(prev => \{

      const newSet = new Set\(prev\);

      if \(force \!== undefined\) \{

        if \(force\) \{

          newSet\.add\(index\);

        \} else \{

          newSet\.delete\(index\);

        \}

      \} else \{

        if \(newSet\.has\(index\)\) \{

          newSet\.delete\(index\);

        \} else \{

          if \(\!allowMultiple\) \{

            newSet\.clear\(\);

          \}

          newSet\.add\(index\);

        \}

      \}

      return newSet;

    \}\);

  \};

  const handleExpandAll = \(\) => \{

    const childrenArray = Children\.toArray\(children\);

    const allIndices = new Set\(childrenArray\.map\(\(\_, index\) => index\)\);

    setExpandedItems\(allIndices\);

    onExpandAll?\.\(\);

  \};

  const handleCollapseAll = \(\) => \{

    setExpandedItems\(new Set\(\)\);

    onCollapseAll?\.\(\);

  \};

  const accordionClasses = classNames\(

    'dyn\-accordion',

    \{

      'dyn\-accordion\-with\-manager': showManagerAccordion

    \},

    className

  \);

  const contextValue: AccordionContextType = \{

    allowMultiple,

    expandedItems,

    toggleItem

  \};

  return \(

    <AccordionContext\.Provider value=\{contextValue\}>

      <div className=\{accordionClasses\}>

        \{showManagerAccordion && \(

          <div className="dyn\-accordion\-manager">

            <DynButton

              label=\{literals\.expandAllItems\}

              kind="tertiary"

              size="small"

              onClick=\{handleExpandAll\}

            />

            <DynButton

              label=\{literals\.closeAllItems\}

              kind="tertiary"

              size="small"

              onClick=\{handleCollapseAll\}

            />

          </div>

        \)\}

        <div className="dyn\-accordion\-items">

          \{Children\.map\(children, \(child, index\) => \{

            if \(isValidElement\(child\)\) \{

              return cloneElement\(child, \{

                \.\.\.child\.props,

                'data\-index': index,

                expanded: expandedItems\.has\(index\)

              \}\);

            \}

            return child;

          \}\)\}

        </div>

      </div>

    </AccordionContext\.Provider>

  \);

\}\);

// DynAccordionItem Component

const DynAccordionItem: React\.FC<DynAccordionItemProps & \{ 'data\-index'?: number \}> = \(\{

  label,

  disabled = false,

  expanded: propExpanded,

  children,

  className,

  onExpand,

  'data\-index': dataIndex

\}\) => \{

  const context = useContext\(AccordionContext\);

  const index = dataIndex ?? 0;

  const isExpanded = context ? context\.expandedItems\.has\(index\) : propExpanded || false;

  const handleToggle = \(\) => \{

    if \(\!disabled\) \{

      if \(context\) \{

        context\.toggleItem\(index\);

      \}

      onExpand?\.\(\!isExpanded\);

    \}

  \};

  const itemClasses = classNames\(

    'dyn\-accordion\-item',

    \{

      'dyn\-accordion\-item\-expanded': isExpanded,

      'dyn\-accordion\-item\-disabled': disabled

    \},

    className

  \);

  return \(

    <div className=\{itemClasses\}>

      <button

        className="dyn\-accordion\-item\-header"

        disabled=\{disabled\}

        onClick=\{handleToggle\}

        aria\-expanded=\{isExpanded\}

      >

        <span className="dyn\-accordion\-item\-label">\{label\}</span>

        <DynIcon 

          icon="dyn\-icon\-arrow\-down"

          className=\{classNames\('dyn\-accordion\-item\-arrow', \{

            'dyn\-accordion\-item\-arrow\-up': isExpanded

          \}\)\}

        />

      </button>

      \{isExpanded && \(

        <div className="dyn\-accordion\-item\-content">

          \{children\}

        </div>

      \)\}

    </div>

  \);

\};

DynAccordion\.displayName = 'DynAccordion';

export \{ DynAccordion, DynAccordionItem \};

export default DynAccordion;

### <a id="_Toc209713947"></a>\.NET Core modeli za Interakcijske komponente

// Models/UI/InteractionComponentModels\.cs

namespace DynUI\.Models\.UI

\{

    // Modal Models

    public enum ModalSize

    \{

        SM, MD, LG, XL, Auto

    \}

    public class ModalActionDto

    \{

        public string Action \{ get; set; \} = string\.Empty;

        public bool Danger \{ get; set; \} = false;

        public bool Disabled \{ get; set; \} = false;

        public string Label \{ get; set; \} = string\.Empty;

        public bool Loading \{ get; set; \} = false;

    \}

    public class ModalConfigDto

    \{

        public string? Title \{ get; set; \}

        public ModalSize Size \{ get; set; \} = ModalSize\.MD;

        public bool HideClose \{ get; set; \} = false;

        public bool ClickOut \{ get; set; \} = false;

        public string ComponentsSize \{ get; set; \} = "medium";

        public string? Icon \{ get; set; \}

        public ModalActionDto? PrimaryAction \{ get; set; \}

        public ModalActionDto? SecondaryAction \{ get; set; \}

        public string? Content \{ get; set; \}

    \}

    // Popup Models

    public enum PopupPosition

    \{

        Right, RightBottom, RightTop,

        Bottom, BottomLeft, BottomRight,

        Left, LeftTop, LeftBottom,

        Top, TopRight, TopLeft

    \}

    public class PopupActionDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string ActionEndpoint \{ get; set; \} = string\.Empty;

        public string? Icon \{ get; set; \}

        public bool Disabled \{ get; set; \} = false;

        public bool Visible \{ get; set; \} = true;

        public bool Separator \{ get; set; \} = false;

    \}

    public class PopupConfigDto

    \{

        public List<PopupActionDto> Actions \{ get; set; \} = new\(\);

        public PopupPosition Position \{ get; set; \} = PopupPosition\.BottomLeft;

        public List<PopupPosition> CustomPositions \{ get; set; \} = new\(\);

        public bool HideArrow \{ get; set; \} = false;

        public bool IsCornerAlign \{ get; set; \} = false;

        public string Size \{ get; set; \} = "medium";

    \}

    // Dropdown Models

    public class DropdownActionDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string? ActionEndpoint \{ get; set; \}

        public string? Url \{ get; set; \}

        public string? Icon \{ get; set; \}

        public bool Disabled \{ get; set; \} = false;

        public bool Visible \{ get; set; \} = true;

        public bool Separator \{ get; set; \} = false;

    \}

    public class DropdownConfigDto

    \{

        public string? Label \{ get; set; \}

        public List<DropdownActionDto> Actions \{ get; set; \} = new\(\);

        public bool Disabled \{ get; set; \} = false;

        public string Size \{ get; set; \} = "medium";

    \}

    // Accordion Models

    public class AccordionLiteralsDto

    \{

        public string CloseAllItems \{ get; set; \} = "Fechar todos os itens";

        public string ExpandAllItems \{ get; set; \} = "Abrir todos os itens";

    \}

    public class AccordionItemDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public bool Disabled \{ get; set; \} = false;

        public bool Expanded \{ get; set; \} = false;

        public string? Content \{ get; set; \}

        public List<UIComponentDto>? Components \{ get; set; \}

    \}

    public class AccordionConfigDto

    \{

        public bool ShowManagerAccordion \{ get; set; \} = false;

        public bool AllowExpandItems \{ get; set; \} = false;

        public AccordionLiteralsDto? Literals \{ get; set; \}

        public List<AccordionItemDto> Items \{ get; set; \} = new\(\);

    \}

\}

### <a id="_Toc209713948"></a>Entity Framework modeli za Interakcijske komponente

// Data/Entities/InteractionEntities\.cs

namespace DynUI\.Data\.Entities

\{

    public class ModalEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string? Title \{ get; set; \}

        public string Size \{ get; set; \} = "md";

        public bool HideClose \{ get; set; \} = false;

        public bool ClickOut \{ get; set; \} = false;

        public string ComponentsSize \{ get; set; \} = "medium";

        public string? Icon \{ get; set; \}

        public string? Configuration \{ get; set; \} // JSON

        public bool IsActive \{ get; set; \} = true;

        public DateTime CreatedAt \{ get; set; \} = DateTime\.UtcNow;

        public DateTime? UpdatedAt \{ get; set; \}

    \}

    public class PopupEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string Position \{ get; set; \} = "bottom\-left";

        public string? CustomPositions \{ get; set; \} // JSON array

        public bool HideArrow \{ get; set; \} = false;

        public bool IsCornerAlign \{ get; set; \} = false;

        public string Size \{ get; set; \} = "medium";

        public string ActionsConfiguration \{ get; set; \} = string\.Empty; // JSON

        public bool IsActive \{ get; set; \} = true;

    \}

    public class DropdownEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public string? Label \{ get; set; \}

        public bool Disabled \{ get; set; \} = false;

        public string Size \{ get; set; \} = "medium";

        public string ActionsConfiguration \{ get; set; \} = string\.Empty; // JSON

        public bool IsActive \{ get; set; \} = true;

    \}

    public class AccordionEntity

    \{

        public int Id \{ get; set; \}

        public string Name \{ get; set; \} = string\.Empty;

        public bool ShowManagerAccordion \{ get; set; \} = false;

        public bool AllowExpandItems \{ get; set; \} = false;

        public string? LiteralsConfiguration \{ get; set; \} // JSON

        public bool IsActive \{ get; set; \} = true;

        // Navigation properties

        public virtual ICollection<AccordionItemEntity> Items \{ get; set; \} = new List<AccordionItemEntity>\(\);

    \}

    public class AccordionItemEntity

    \{

        public int Id \{ get; set; \}

        public int AccordionId \{ get; set; \}

        public string Label \{ get; set; \} = string\.Empty;

        public bool Disabled \{ get; set; \} = false;

        public bool Expanded \{ get; set; \} = false;

        public string? Content \{ get; set; \}

        public int Order \{ get; set; \}

        // Navigation properties

        public virtual AccordionEntity Accordion \{ get; set; \} = null\!;

    \}

\}

### <a id="_Toc209713949"></a>CSS stilovi za Interakcijske komponente

// styles/components/\_dyn\-interaction\-components\.scss

// Modal Styles

\.dyn\-modal\-overlay \{

  position: fixed;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  background\-color: rgba\(0, 0, 0, 0\.7\);

  display: flex;

  align\-items: center;

  justify\-content: center;

  z\-index: 10000;

  padding: 1rem;

\}

\.dyn\-modal \{

  \-\-border\-radius: var\(\-\-border\-radius\-md, 4px\);

  \-\-border\-width: var\(\-\-border\-width\-sm, 1px\);

  \-\-border\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \-\-background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  \-\-shadow: var\(\-\-shadow\-md, 0 4px 16px rgba\(0,0,0,0\.15\)\);

  \-\-padding\-header: var\(\-\-spacing\-sm, 12px\) var\(\-\-spacing\-md, 16px\);

  \-\-padding\-body: var\(\-\-spacing\-md, 16px\) var\(\-\-spacing\-2xl, 32px\) var\(\-\-spacing\-2xl, 32px\) var\(\-\-spacing\-md, 16px\);

  background: var\(\-\-background\);

  border: var\(\-\-border\-width\) solid var\(\-\-border\-color\);

  border\-radius: var\(\-\-border\-radius\);

  box\-shadow: var\(\-\-shadow\);

  max\-height: 90vh;

  overflow: hidden;

  display: flex;

  flex\-direction: column;

  &\-sm \{ width: 400px; \}

  &\-md \{ width: 600px; \}

  &\-lg \{ width: 800px; \}

  &\-xl \{ width: 1000px; \}

  &\-auto \{ width: auto; max\-width: 90vw; \}

  &\-header \{

    padding: var\(\-\-padding\-header\);

    border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    display: flex;

    align\-items: center;

    justify\-content: space\-between;

  \}

  &\-title\-container \{

    display: flex;

    align\-items: center;

    gap: 0\.75rem;

  \}

  &\-title \{

    margin: 0;

    font\-size: 1\.25rem;

    font\-weight: 600;

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-close \{

    background: none;

    border: none;

    padding: 0\.5rem;

    cursor: pointer;

    border\-radius: 50%;

    display: flex;

    align\-items: center;

    justify\-content: center;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    &:hover \{

      background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    \}

  \}

  &\-body \{

    padding: var\(\-\-padding\-body\);

    overflow\-y: auto;

    flex: 1;

  \}

  &\-footer \{

    padding: var\(\-\-spacing\-md, 16px\);

    border\-top: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \}

  &\-actions \{

    display: flex;

    gap: 0\.75rem;

    justify\-content: flex\-end;

  \}

  &\-components\-small \{

    \.dyn\-field, \.dyn\-button, \.dyn\-input \{

      \-\-field\-size: small;

    \}

  \}

\}

// Popup Styles

\.dyn\-popup \{

  \-\-border\-radius: var\(\-\-border\-radius\-md, 4px\);

  \-\-border\-width: var\(\-\-border\-width\-sm, 1px\);

  \-\-border\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \-\-background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  \-\-shadow: var\(\-\-shadow\-md, 0 4px 16px rgba\(0,0,0,0\.15\)\);

  background: var\(\-\-background\);

  border: var\(\-\-border\-width\) solid var\(\-\-border\-color\);

  border\-radius: var\(\-\-border\-radius\);

  box\-shadow: var\(\-\-shadow\);

  min\-width: 200px;

  max\-width: 300px;

  z\-index: 9999;

  &\-arrow \{

    position: absolute;

    width: 0;

    height: 0;

    border: 8px solid transparent;

    &\-top\-left \{

      top: \-16px;

      left: 16px;

      border\-bottom\-color: var\(\-\-background\);

    \}

    &\-top\-right \{

      top: \-16px;

      right: 16px;

      border\-bottom\-color: var\(\-\-background\);

    \}

    &\-bottom\-left \{

      bottom: \-16px;

      left: 16px;

      border\-top\-color: var\(\-\-background\);

    \}

    &\-bottom\-right \{

      bottom: \-16px;

      right: 16px;

      border\-top\-color: var\(\-\-background\);

    \}

  \}

  &\-content \{

    padding: 0\.5rem 0;

  \}

  &\-list \{

    list\-style: none;

    margin: 0;

    padding: 0;

  \}

  &\-item \{

    display: flex;

    align\-items: center;

    gap: 0\.5rem;

    padding: 0\.75rem 1rem;

    cursor: pointer;

    color: var\(\-\-color\-action\-default, \#0066cc\);

    font\-weight: 600;

    font\-size: var\(\-\-font\-size\-default, 14px\);

    &:hover:not\(\.dyn\-popup\-item\-disabled\) \{

      background\-color: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

      color: var\(\-\-color\-brand\-01\-darkest, \#003d7a\);

    \}

    &:active:not\(\.dyn\-popup\-item\-disabled\) \{

      background\-color: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

    \}

    &\-disabled \{

      color: var\(\-\-color\-action\-disabled, \#ccc\);

      cursor: not\-allowed;

      opacity: 0\.6;

    \}

  \}

  &\-separator \{

    height: 1px;

    background\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    margin: 0\.25rem 0;

  \}

\}

// Dropdown Styles

\.dyn\-dropdown \{

  position: relative;

  display: inline\-block;

  &\-button \{

    \-\-font\-family: var\(\-\-font\-family\-theme, system\-ui\);

    \-\-font\-size: var\(\-\-font\-size\-default, 14px\);

    \-\-font\-weight: var\(\-\-font\-weight\-bold, 600\);

    \-\-color: var\(\-\-color\-action\-default, \#0066cc\);

    \-\-border\-radius: var\(\-\-border\-radius\-md, 4px\);

    \-\-border\-width: var\(\-\-border\-width\-md, 1px\);

    \-\-padding: 0 1em;

    display: flex;

    align\-items: center;

    justify\-content: space\-between;

    gap: 0\.5rem;

    padding: var\(\-\-padding\);

    background: transparent;

    border: var\(\-\-border\-width\) solid var\(\-\-color\);

    border\-radius: var\(\-\-border\-radius\);

    color: var\(\-\-color\);

    font\-family: var\(\-\-font\-family\);

    font\-size: var\(\-\-font\-size\);

    font\-weight: var\(\-\-font\-weight\);

    cursor: pointer;

    min\-height: 44px;

    &:hover:not\(:disabled\) \{

      background\-color: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

      border\-color: var\(\-\-color\-brand\-01\-darkest, \#003d7a\);

    \}

    &:focus\-visible \{

      outline: 2px solid var\(\-\-color\-action\-focus, \#0066cc\);

      outline\-offset: 2px;

    \}

    &:active:not\(:disabled\) \{

      background\-color: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

    \}

    &:disabled \{

      color: var\(\-\-color\-action\-disabled, \#ccc\);

      border\-color: var\(\-\-color\-action\-disabled, \#ccc\);

      cursor: not\-allowed;

      opacity: 0\.6;

    \}

  \}

  &\-small &\-button \{

    min\-height: 32px;

    font\-size: 0\.875rem;

  \}

  &\-arrow \{

    transition: transform 0\.2s ease;

    &\-up \{

      transform: rotate\(180deg\);

    \}

  \}

  &\-content \{

    position: absolute;

    top: 100%;

    left: 0;

    right: 0;

    background: var\(\-\-color\-neutral\-light\-00, \#fff\);

    border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    border\-radius: var\(\-\-border\-radius\-md, 4px\);

    box\-shadow: var\(\-\-shadow\-md, 0 4px 16px rgba\(0,0,0,0\.15\)\);

    z\-index: 1000;

    margin\-top: 4px;

  \}

  &\-list \{

    list\-style: none;

    margin: 0;

    padding: 0\.5rem 0;

  \}

  &\-item \{

    display: flex;

    align\-items: center;

    gap: 0\.5rem;

    padding: 0\.75rem 1rem;

    cursor: pointer;

    color: var\(\-\-color\-action\-default, \#0066cc\);

    font\-weight: 600;

    &:hover:not\(\.dyn\-dropdown\-item\-disabled\) \{

      background\-color: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

      color: var\(\-\-color\-brand\-01\-darkest, \#003d7a\);

    \}

    &\-disabled \{

      color: var\(\-\-color\-action\-disabled, \#ccc\);

      cursor: not\-allowed;

      opacity: 0\.6;

    \}

  \}

  &\-separator \{

    height: 1px;

    background\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    margin: 0\.25rem 0;

  \}

\}

// Accordion Styles

\.dyn\-accordion \{

  border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  overflow: hidden;

  &\-manager \{

    background\-color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    padding: 0\.75rem;

    display: flex;

    gap: 0\.5rem;

    \.dyn\-button \{

      \-\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

      \-\-font\-family: var\(\-\-font\-family\-theme, system\-ui\);

      \-\-font\-size: var\(\-\-font\-size\-default, 14px\);

      \-\-font\-weight: var\(\-\-font\-weight\-bold, 600\);

    \}

  \}

  &\-item \{

    border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    &:last\-child \{

      border\-bottom: none;

    \}

    &\-header \{

      width: 100%;

      display: flex;

      align\-items: center;

      justify\-content: space\-between;

      padding: 1rem;

      background: var\(\-\-color\-neutral\-light\-00, \#fff\);

      border: none;

      cursor: pointer;

      font\-family: var\(\-\-font\-family\-theme, system\-ui\);

      font\-size: var\(\-\-font\-size\-default, 14px\);

      font\-weight: var\(\-\-font\-weight\-bold, 600\);

      color: var\(\-\-color\-action\-default, \#0066cc\);

      text\-align: left;

      &:hover:not\(:disabled\) \{

        background\-color: var\(\-\-color\-brand\-01\-lightest, \#f0f8ff\);

        color: var\(\-\-color\-action\-hover, \#0052a3\);

      \}

      &:focus\-visible \{

        outline: 2px solid var\(\-\-color\-action\-focus, \#0066cc\);

        outline\-offset: \-2px;

      \}

      &:active:not\(:disabled\) \{

        background\-color: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

        color: var\(\-\-color\-action\-pressed, \#003d7a\);

      \}

      &:disabled \{

        color: var\(\-\-color\-neutral\-mid\-60, \#999\);

        background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

        cursor: not\-allowed;

      \}

    \}

    &\-arrow \{

      transition: transform 0\.2s ease;

      &\-up \{

        transform: rotate\(180deg\);

      \}

    \}

    &\-content \{

      padding: 1rem;

      background\-color: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

      border\-top: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    \}

    &\-disabled &\-header \{

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

      cursor: not\-allowed;

    \}

  \}

\}

// Responsive

@media \(max\-width: 768px\) \{

  \.dyn\-modal \{

    &\-sm, &\-md, &\-lg, &\-xl \{

      width: 95vw;

      max\-width: none;

    \}

    &\-body \{

      padding: var\(\-\-spacing\-md, 16px\);

    \}

  \}

  \.dyn\-popup \{

    max\-width: 250px;

  \}

  \.dyn\-dropdown\-content \{

    left: 0;

    right: 0;

  \}

\}

Ovom implementacijom pokrivam kompletan set Interakcijskih komponenti koji omogu─çavaju bogate korisni─ìke interakcije:

1. \*\*Modal\*\*: Modalni dijalozi sa fleksibilnim akcijama i sadr┼╛ajem
2. \*\*Popup\*\*: Kontekstualni popupovi sa pametnim pozicioniranjem
3. \*\*Dropdown\*\*: Dropdown meniji sa akcijama i navigacijom
4. \*\*Accordion\*\*: Pro┼íirive sekcije sa manager funkcionalnostima

Komponente podr┼╛avaju accessibility standarde, keyboard navigaciju i responsive dizajn\. ┼╜elite li da nastavim sa slede─çom grupom componenti ili da detaljnije razradim neki aspekt ovih Interakcijskih komponenti?

\-\-\-

## <a id="_Toc209713950"></a>Grupa 5: Form/Field komponente \(Input, Select, Checkbox, DatePicker, Upload\)

Ova grupa predstavlja najopse┼╛niji set komponenti sa preko 20 razli─ìitih tipova input polja\. Analiziraju─çi search rezultate, vidim slede─çe klju─ìne komponente koje treba implementirati\.

### <a id="_Toc209713951"></a>Osnovna arhitektura Field sistema

#### <a id="_Toc209713952"></a>Bazni Field Interface:

// types/field\.types\.ts

export interface DynFieldValidation \{

  required?: boolean;

  minLength?: number;

  maxLength?: number;

  pattern?: string | RegExp;

  custom?: \(value: any\) => string | null;

\}

export interface DynFieldBase \{

  name?: string;

  label?: string;

  help?: string;

  placeholder?: string;

  disabled?: boolean;

  readonly?: boolean;

  required?: boolean;

  optional?: boolean;

  visible?: boolean;

  value?: any;

  errorMessage?: string;

  validation?: DynFieldValidation;

  className?: string;

  onChange?: \(value: any\) => void;

  onBlur?: \(\) => void;

  onFocus?: \(\) => void;

\}

export interface DynFieldRef \{

  focus\(\): void;

  validate\(\): boolean;

  clear\(\): void;

  getValue\(\): any;

  setValue\(value: any\): void;

\}

### <a id="_Toc209713953"></a>DYNInput \- Implementacija u React/TypeScript

// types/input\.types\.ts

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export type InputSize = 'small' | 'medium' | 'large';

export interface DynInputProps extends DynFieldBase \{

  type?: InputType;

  size?: InputSize;

  maxlength?: number;

  minlength?: number;

  mask?: string;

  maskFormatModel?: boolean;

  pattern?: string;

  icon?: string;

  clean?: boolean;

  noAutocomplete?: boolean;

  step?: number;

  min?: number;

  max?: number;

\}

// components/DynInput\.tsx

import React, \{ forwardRef, useImperativeHandle, useRef, useState, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynInputProps \} from '\.\./types/input\.types';

import \{ DynFieldContainer \} from '\./DynFieldContainer';

import \{ useFieldValidation \} from '\.\./hooks/useFieldValidation';

import \{ useMask \} from '\.\./hooks/useMask';

import \{ DynIcon \} from '\./DynIcon';

const DynInput = forwardRef<DynFieldRef, DynInputProps>\(\(\{

  name,

  label,

  help,

  placeholder,

  disabled = false,

  readonly = false,

  required = false,

  optional = false,

  visible = true,

  value: propValue = '',

  errorMessage,

  validation,

  className,

  type = 'text',

  size = 'medium',

  maxlength,

  minlength,

  mask,

  maskFormatModel = false,

  pattern,

  icon,

  clean = false,

  noAutocomplete = false,

  step,

  min,

  max,

  onChange,

  onBlur,

  onFocus

\}, ref\) => \{

  const \[value, setValue\] = useState\(propValue\);

  const \[focused, setFocused\] = useState\(false\);

  const inputRef = useRef<HTMLInputElement>\(null\);

  const \{ error, validate, clearError \} = useFieldValidation\(\{

    value,

    required,

    validation,

    customError: errorMessage

  \}\);

  const \{ maskedValue, unmaskValue, handleMaskedChange \} = useMask\(\{

    mask,

    value,

    formatModel: maskFormatModel

  \}\);

  useImperativeHandle\(ref, \(\) => \(\{

    focus\(\) \{

      inputRef\.current?\.focus\(\);

    \},

    validate\(\) \{

      return validate\(\);

    \},

    clear\(\) \{

      setValue\(''\);

      onChange?\.\(''\);

      clearError\(\);

    \},

    getValue\(\) \{

      return mask && \!maskFormatModel ? unmaskValue\(value\) : value;

    \},

    setValue\(newValue: any\) \{

      setValue\(String\(newValue || ''\)\);

      onChange?\.\(newValue\);

    \}

  \}\)\);

  useEffect\(\(\) => \{

    setValue\(propValue\);

  \}, \[propValue\]\);

  const handleChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{

    const newValue = e\.target\.value;

    if \(mask\) \{

      const processedValue = handleMaskedChange\(newValue\);

      setValue\(processedValue\);

      onChange?\.\(maskFormatModel ? processedValue : unmaskValue\(processedValue\)\);

    \} else \{

      setValue\(newValue\);

      onChange?\.\(type === 'number' ? Number\(newValue\) : newValue\);

    \}

    clearError\(\);

  \};

  const handleBlur = \(\) => \{

    setFocused\(false\);

    validate\(\);

    onBlur?\.\(\);

  \};

  const handleFocus = \(\) => \{

    setFocused\(true\);

    clearError\(\);

    onFocus?\.\(\);

  \};

  const handleClean = \(\) => \{

    setValue\(''\);

    onChange?\.\(''\);

    clearError\(\);

    inputRef\.current?\.focus\(\);

  \};

  if \(\!visible\) return null;

  const inputClasses = classNames\(

    'dyn\-input',

    \`dyn\-input\-$\{size\}\`,

    \{

      'dyn\-input\-focused': focused,

      'dyn\-input\-error': \!\!error,

      'dyn\-input\-disabled': disabled,

      'dyn\-input\-readonly': readonly,

      'dyn\-input\-with\-icon': \!\!icon,

      'dyn\-input\-cleanable': clean && value && \!readonly && \!disabled

    \}

  \);

  const displayValue = mask ? maskedValue : value;

  return \(

    <DynFieldContainer

      label=\{label\}

      help=\{help\}

      required=\{required\}

      optional=\{optional\}

      error=\{error\}

      className=\{className\}

      htmlFor=\{name\}

    >

      <div className="dyn\-input\-container">

        \{icon && \(

          <div className="dyn\-input\-icon\-container">

            <DynIcon icon=\{icon\} />

          </div>

        \)\}

        <input

          ref=\{inputRef\}

          id=\{name\}

          name=\{name\}

          type=\{type === 'number' ? 'text' : type\}

          className=\{inputClasses\}

          placeholder=\{placeholder\}

          value=\{displayValue\}

          disabled=\{disabled\}

          readOnly=\{readonly\}

          maxLength=\{maxlength\}

          minLength=\{minlength\}

          pattern=\{pattern\}

          step=\{step\}

          min=\{min\}

          max=\{max\}

          autoComplete=\{noAutocomplete ? 'off' : undefined\}

          onChange=\{handleChange\}

          onBlur=\{handleBlur\}

          onFocus=\{handleFocus\}

          aria\-invalid=\{\!\!error\}

          aria\-describedby=\{error ? \`$\{name\}\-error\` : undefined\}

        />

        \{clean && value && \!readonly && \!disabled && \(

          <button

            type="button"

            className="dyn\-input\-clean\-button"

            onClick=\{handleClean\}

            tabIndex=\{\-1\}

            aria\-label="Limpar campo"

          >

            <DynIcon icon="dyn\-icon\-close" />

          </button>

        \)\}

      </div>

    </DynFieldContainer>

  \);

\}\);

DynInput\.displayName = 'DynInput';

export default DynInput;

### <a id="_Toc209713954"></a>DYNSelect \- Implementacija u React/TypeScript

// types/select\.types\.ts

export interface SelectOption \{

  value: any;

  label: string;

  disabled?: boolean;

\}

export interface DynSelectProps extends DynFieldBase \{

  options: SelectOption\[\] | any\[\];

  optionLabel?: string;

  optionValue?: string;

  optionDisabled?: string;

  size?: InputSize;

  searchable?: boolean;

  sort?: boolean;

  showRequired?: boolean;

  placeholder?: string;

  fieldLabel?: string;

  fieldValue?: string;

\}

// components/DynSelect\.tsx

import React, \{ forwardRef, useImperativeHandle, useRef, useState, useEffect, useMemo \} from 'react';

import classNames from 'classnames';

import \{ DynSelectProps, SelectOption \} from '\.\./types/select\.types';

import \{ DynFieldContainer \} from '\./DynFieldContainer';

import \{ useFieldValidation \} from '\.\./hooks/useFieldValidation';

import \{ DynIcon \} from '\./DynIcon';

const DynSelect = forwardRef<DynFieldRef, DynSelectProps>\(\(\{

  name,

  label,

  help,

  placeholder = 'Selecione',

  disabled = false,

  readonly = false,

  required = false,

  optional = false,

  visible = true,

  value: propValue,

  errorMessage,

  validation,

  className,

  options = \[\],

  optionLabel = 'label',

  optionValue = 'value',

  optionDisabled = 'disabled',

  size = 'medium',

  searchable = false,

  sort = false,

  showRequired = true,

  fieldLabel,

  fieldValue,

  onChange,

  onBlur,

  onFocus

\}, ref\) => \{

  const \[value, setValue\] = useState\(propValue\);

  const \[isOpen, setIsOpen\] = useState\(false\);

  const \[searchTerm, setSearchTerm\] = useState\(''\);

  const \[focused, setFocused\] = useState\(false\);

  const selectRef = useRef<HTMLDivElement>\(null\);

  const inputRef = useRef<HTMLInputElement>\(null\);

  const \{ error, validate, clearError \} = useFieldValidation\(\{

    value,

    required,

    validation,

    customError: errorMessage

  \}\);

  useImperativeHandle\(ref, \(\) => \(\{

    focus\(\) \{

      inputRef\.current?\.focus\(\);

    \},

    validate\(\) \{

      return validate\(\);

    \},

    clear\(\) \{

      setValue\(undefined\);

      onChange?\.\(undefined\);

      clearError\(\);

    \},

    getValue\(\) \{

      return value;

    \},

    setValue\(newValue: any\) \{

      setValue\(newValue\);

      onChange?\.\(newValue\);

    \}

  \}\)\);

  const normalizedOptions = useMemo\(\(\) => \{

    let opts: SelectOption\[\] = \[\];

    if \(Array\.isArray\(options\) && options\.length > 0\) \{

      opts = options\.map\(option => \{

        if \(typeof option === 'object' && option \!== null\) \{

          return \{

            value: option\[fieldValue || optionValue\],

            label: option\[fieldLabel || optionLabel\],

            disabled: option\[optionDisabled\] || false

          \};

        \}

        return \{

          value: option,

          label: String\(option\),

          disabled: false

        \};

      \}\);

    \}

    if \(sort\) \{

      opts\.sort\(\(a, b\) => a\.label\.localeCompare\(b\.label\)\);

    \}

    return opts;

  \}, \[options, optionLabel, optionValue, optionDisabled, fieldLabel, fieldValue, sort\]\);

  const filteredOptions = useMemo\(\(\) => \{

    if \(\!searchable || \!searchTerm\) return normalizedOptions;

    return normalizedOptions\.filter\(option =>

      option\.label\.toLowerCase\(\)\.includes\(searchTerm\.toLowerCase\(\)\)

    \);

  \}, \[normalizedOptions, searchTerm, searchable\]\);

  const selectedOption = normalizedOptions\.find\(option => option\.value === value\);

  useEffect\(\(\) => \{

    setValue\(propValue\);

  \}, \[propValue\]\);

  useEffect\(\(\) => \{

    const handleClickOutside = \(event: MouseEvent\) => \{

      if \(selectRef\.current && \!selectRef\.current\.contains\(event\.target as Node\)\) \{

        setIsOpen\(false\);

        setSearchTerm\(''\);

      \}

    \};

    if \(isOpen\) \{

      document\.addEventListener\('mousedown', handleClickOutside\);

    \}

    return \(\) => \{

      document\.removeEventListener\('mousedown', handleClickOutside\);

    \};

  \}, \[isOpen\]\);

  const handleToggle = \(\) => \{

    if \(\!disabled && \!readonly\) \{

      setIsOpen\(prev => \!prev\);

      if \(\!isOpen\) \{

        inputRef\.current?\.focus\(\);

      \}

    \}

  \};

  const handleOptionSelect = \(option: SelectOption\) => \{

    if \(\!option\.disabled\) \{

      setValue\(option\.value\);

      onChange?\.\(option\.value\);

      setIsOpen\(false\);

      setSearchTerm\(''\);

      clearError\(\);

    \}

  \};

  const handleBlur = \(\) => \{

    setFocused\(false\);

    validate\(\);

    onBlur?\.\(\);

  \};

  const handleFocus = \(\) => \{

    setFocused\(true\);

    clearError\(\);

    onFocus?\.\(\);

  \};

  const handleSearchChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{

    setSearchTerm\(e\.target\.value\);

  \};

  const handleKeyDown = \(e: React\.KeyboardEvent\) => \{

    switch \(e\.key\) \{

      case 'Enter':

      case ' ':

        if \(\!isOpen\) \{

          e\.preventDefault\(\);

          setIsOpen\(true\);

        \}

        break;

      case 'Escape':

        setIsOpen\(false\);

        setSearchTerm\(''\);

        break;

      case 'ArrowDown':

        if \(\!isOpen\) \{

          setIsOpen\(true\);

        \}

        break;

    \}

  \};

  if \(\!visible\) return null;

  const selectClasses = classNames\(

    'dyn\-select',

    \`dyn\-select\-$\{size\}\`,

    \{

      'dyn\-select\-open': isOpen,

      'dyn\-select\-focused': focused,

      'dyn\-select\-error': \!\!error,

      'dyn\-select\-disabled': disabled,

      'dyn\-select\-readonly': readonly,

      'dyn\-select\-searchable': searchable

    \}

  \);

  const displayText = selectedOption?\.label || placeholder;

  const showPlaceholder = \!selectedOption;

  return \(

    <DynFieldContainer

      label=\{label\}

      help=\{help\}

      required=\{required\}

      optional=\{optional\}

      error=\{error\}

      className=\{className\}

      htmlFor=\{name\}

    >

      <div ref=\{selectRef\} className="dyn\-select\-container">

        <div

          className=\{selectClasses\}

          onClick=\{handleToggle\}

          onKeyDown=\{handleKeyDown\}

          tabIndex=\{disabled ? \-1 : 0\}

          role="combobox"

          aria\-expanded=\{isOpen\}

          aria\-haspopup="listbox"

          onBlur=\{handleBlur\}

          onFocus=\{handleFocus\}

        >

          <input

            ref=\{inputRef\}

            type="hidden"

            id=\{name\}

            name=\{name\}

            value=\{value || ''\}

          />

          <div className=\{classNames\('dyn\-select\-content', \{

            'dyn\-select\-placeholder': showPlaceholder

          \}\)\}>

            \{displayText\}

          </div>

          <div className="dyn\-select\-arrow">

            <DynIcon 

              icon="dyn\-icon\-arrow\-down"

              className=\{classNames\(\{

                'dyn\-select\-arrow\-up': isOpen

              \}\)\}

            />

          </div>

        </div>

        \{isOpen && \(

          <div className="dyn\-select\-dropdown">

            \{searchable && \(

              <div className="dyn\-select\-search">

                <input

                  type="text"

                  placeholder="Pesquisar\.\.\."

                  value=\{searchTerm\}

                  onChange=\{handleSearchChange\}

                  className="dyn\-select\-search\-input"

                />

              </div>

            \)\}

            <div className="dyn\-select\-options" role="listbox">

              \{filteredOptions\.length === 0 ? \(

                <div className="dyn\-select\-empty">

                  Nenhuma op├º├úo encontrada

                </div>

              \) : \(

                filteredOptions\.map\(\(option, index\) => \(

                  <div

                    key=\{index\}

                    className=\{classNames\('dyn\-select\-option', \{

                      'dyn\-select\-option\-selected': option\.value === value,

                      'dyn\-select\-option\-disabled': option\.disabled

                    \}\)\}

                    onClick=\{\(\) => handleOptionSelect\(option\)\}

                    role="option"

                    aria\-selected=\{option\.value === value\}

                  >

                    \{option\.label\}

                  </div>

                \)\)

              \)\}

            </div>

          </div>

        \)\}

      </div>

    </DynFieldContainer>

  \);

\}\);

DynSelect\.displayName = 'DynSelect';

export default DynSelect;

### <a id="_Toc209713955"></a>DYNCheckbox \- Implementacija u React/TypeScript

// types/checkbox\.types\.ts

export interface DynCheckboxProps extends Omit<DynFieldBase, 'value'> \{

  checked?: boolean;

  indeterminate?: boolean;

  size?: InputSize;

\}

export interface CheckboxOption \{

  value: any;

  label: string;

  disabled?: boolean;

\}

export interface DynCheckboxGroupProps extends DynFieldBase \{

  options: CheckboxOption\[\] | any\[\];

  optionLabel?: string;

  optionValue?: string;

  optionDisabled?: string;

  columns?: number;

  size?: InputSize;

\}

// components/DynCheckbox\.tsx

import React, \{ forwardRef, useImperativeHandle, useRef, useState, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynCheckboxProps \} from '\.\./types/checkbox\.types';

import \{ DynFieldContainer \} from '\./DynFieldContainer';

import \{ useFieldValidation \} from '\.\./hooks/useFieldValidation';

const DynCheckbox = forwardRef<DynFieldRef, DynCheckboxProps>\(\(\{

  name,

  label,

  help,

  disabled = false,

  readonly = false,

  required = false,

  optional = false,

  visible = true,

  checked: propChecked = false,

  indeterminate = false,

  errorMessage,

  validation,

  className,

  size = 'medium',

  onChange,

  onBlur,

  onFocus

\}, ref\) => \{

  const \[checked, setChecked\] = useState\(propChecked\);

  const checkboxRef = useRef<HTMLInputElement>\(null\);

  const \{ error, validate, clearError \} = useFieldValidation\(\{

    value: checked,

    required,

    validation,

    customError: errorMessage

  \}\);

  useImperativeHandle\(ref, \(\) => \(\{

    focus\(\) \{

      checkboxRef\.current?\.focus\(\);

    \},

    validate\(\) \{

      return validate\(\);

    \},

    clear\(\) \{

      setChecked\(false\);

      onChange?\.\(false\);

      clearError\(\);

    \},

    getValue\(\) \{

      return checked;

    \},

    setValue\(newValue: any\) \{

      setChecked\(Boolean\(newValue\)\);

      onChange?\.\(Boolean\(newValue\)\);

    \}

  \}\)\);

  useEffect\(\(\) => \{

    setChecked\(propChecked\);

  \}, \[propChecked\]\);

  useEffect\(\(\) => \{

    if \(checkboxRef\.current\) \{

      checkboxRef\.current\.indeterminate = indeterminate;

    \}

  \}, \[indeterminate\]\);

  const handleChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{

    if \(\!readonly\) \{

      const newValue = e\.target\.checked;

      setChecked\(newValue\);

      onChange?\.\(newValue\);

      clearError\(\);

    \}

  \};

  const handleBlur = \(\) => \{

    validate\(\);

    onBlur?\.\(\);

  \};

  if \(\!visible\) return null;

  const checkboxClasses = classNames\(

    'dyn\-checkbox',

    \`dyn\-checkbox\-$\{size\}\`,

    \{

      'dyn\-checkbox\-checked': checked,

      'dyn\-checkbox\-indeterminate': indeterminate,

      'dyn\-checkbox\-error': \!\!error,

      'dyn\-checkbox\-disabled': disabled,

      'dyn\-checkbox\-readonly': readonly

    \}

  \);

  return \(

    <DynFieldContainer

      label=\{null\}

      help=\{help\}

      required=\{required\}

      optional=\{optional\}

      error=\{error\}

      className=\{className\}

    >

      <label className="dyn\-checkbox\-container">

        <input

          ref=\{checkboxRef\}

          type="checkbox"

          id=\{name\}

          name=\{name\}

          className="dyn\-checkbox\-input"

          checked=\{checked\}

          disabled=\{disabled\}

          readOnly=\{readonly\}

          onChange=\{handleChange\}

          onBlur=\{handleBlur\}

          onFocus=\{onFocus\}

          aria\-invalid=\{\!\!error\}

        />

        <span className=\{checkboxClasses\}>

          <span className="dyn\-checkbox\-checkmark">

            \{indeterminate ? 'ΓêÆ' : 'Γ£ô'\}

          </span>

        </span>

        \{label && \(

          <span className="dyn\-checkbox\-label">\{label\}</span>

        \)\}

      </label>

    </DynFieldContainer>

  \);

\}\);

DynCheckbox\.displayName = 'DynCheckbox';

export default DynCheckbox;

### <a id="_Toc209713956"></a>DYNDatePicker \- Implementacija u React/TypeScript

// types/datepicker\.types\.ts

export interface DynDatePickerProps extends DynFieldBase \{

  format?: string;

  locale?: string;

  minDate?: Date | string;

  maxDate?: Date | string;

  size?: InputSize;

  clean?: boolean;

  showToday?: boolean;

\}

// components/DynDatePicker\.tsx

import React, \{ forwardRef, useImperativeHandle, useRef, useState, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynDatePickerProps \} from '\.\./types/datepicker\.types';

import \{ DynFieldContainer \} from '\./DynFieldContainer';

import \{ useFieldValidation \} from '\.\./hooks/useFieldValidation';

import \{ DynIcon \} from '\./DynIcon';

import \{ DatePickerCalendar \} from '\./DatePickerCalendar';

const DynDatePicker = forwardRef<DynFieldRef, DynDatePickerProps>\(\(\{

  name,

  label,

  help,

  placeholder = 'dd/mm/aaaa',

  disabled = false,

  readonly = false,

  required = false,

  optional = false,

  visible = true,

  value: propValue,

  errorMessage,

  validation,

  className,

  format = 'dd/MM/yyyy',

  locale = 'pt\-BR',

  minDate,

  maxDate,

  size = 'medium',

  clean = false,

  showToday = true,

  onChange,

  onBlur,

  onFocus

\}, ref\) => \{

  const \[value, setValue\] = useState<Date | null>\(

    propValue ? \(propValue instanceof Date ? propValue : new Date\(propValue\)\) : null

  \);

  const \[displayValue, setDisplayValue\] = useState\(''\);

  const \[isOpen, setIsOpen\] = useState\(false\);

  const \[focused, setFocused\] = useState\(false\);

  const inputRef = useRef<HTMLInputElement>\(null\);

  const containerRef = useRef<HTMLDivElement>\(null\);

  const \{ error, validate, clearError \} = useFieldValidation\(\{

    value,

    required,

    validation,

    customError: errorMessage

  \}\);

  useImperativeHandle\(ref, \(\) => \(\{

    focus\(\) \{

      inputRef\.current?\.focus\(\);

    \},

    validate\(\) \{

      return validate\(\);

    \},

    clear\(\) \{

      setValue\(null\);

      setDisplayValue\(''\);

      onChange?\.\(null\);

      clearError\(\);

    \},

    getValue\(\) \{

      return value;

    \},

    setValue\(newValue: any\) \{

      const date = newValue ? \(newValue instanceof Date ? newValue : new Date\(newValue\)\) : null;

      setValue\(date\);

      setDisplayValue\(date ? formatDate\(date, format\) : ''\);

      onChange?\.\(date\);

    \}

  \}\)\);

  const formatDate = \(date: Date, formatStr: string\): string => \{

    const day = date\.getDate\(\)\.toString\(\)\.padStart\(2, '0'\);

    const month = \(date\.getMonth\(\) \+ 1\)\.toString\(\)\.padStart\(2, '0'\);

    const year = date\.getFullYear\(\)\.toString\(\);

    return formatStr

      \.replace\('dd', day\)

      \.replace\('MM', month\)

      \.replace\('yyyy', year\);

  \};

  const parseDate = \(dateStr: string\): Date | null => \{

    const cleanStr = dateStr\.replace\(/\[^\\d\]/g, ''\);

    if \(cleanStr\.length \!== 8\) return null;

    const day = parseInt\(cleanStr\.substr\(0, 2\)\);

    const month = parseInt\(cleanStr\.substr\(2, 2\)\) \- 1;

    const year = parseInt\(cleanStr\.substr\(4, 4\)\);

    if \(day < 1 || day > 31 || month < 0 || month > 11 || year < 1900\) \{

      return null;

    \}

    const date = new Date\(year, month, day\);

    return date\.getDate\(\) === day && date\.getMonth\(\) === month && date\.getFullYear\(\) === year ? date : null;

  \};

  useEffect\(\(\) => \{

    if \(propValue\) \{

      const date = propValue instanceof Date ? propValue : new Date\(propValue\);

      setValue\(date\);

      setDisplayValue\(formatDate\(date, format\)\);

    \} else \{

      setValue\(null\);

      setDisplayValue\(''\);

    \}

  \}, \[propValue, format\]\);

  useEffect\(\(\) => \{

    const handleClickOutside = \(event: MouseEvent\) => \{

      if \(containerRef\.current && \!containerRef\.current\.contains\(event\.target as Node\)\) \{

        setIsOpen\(false\);

      \}

    \};

    if \(isOpen\) \{

      document\.addEventListener\('mousedown', handleClickOutside\);

    \}

    return \(\) => \{

      document\.removeEventListener\('mousedown', handleClickOutside\);

    \};

  \}, \[isOpen\]\);

  const handleInputChange = \(e: React\.ChangeEvent<HTMLInputElement>\) => \{

    const inputValue = e\.target\.value;

    setDisplayValue\(inputValue\);

    const parsedDate = parseDate\(inputValue\);

    if \(parsedDate\) \{

      setValue\(parsedDate\);

      onChange?\.\(parsedDate\);

    \}

    clearError\(\);

  \};

  const handleCalendarSelect = \(date: Date\) => \{

    setValue\(date\);

    setDisplayValue\(formatDate\(date, format\)\);

    onChange?\.\(date\);

    setIsOpen\(false\);

    clearError\(\);

  \};

  const handleToggleCalendar = \(\) => \{

    if \(\!disabled && \!readonly\) \{

      setIsOpen\(prev => \!prev\);

    \}

  \};

  const handleClean = \(\) => \{

    setValue\(null\);

    setDisplayValue\(''\);

    onChange?\.\(null\);

    clearError\(\);

    inputRef\.current?\.focus\(\);

  \};

  const handleBlur = \(\) => \{

    setFocused\(false\);

    validate\(\);

    onBlur?\.\(\);

  \};

  const handleFocus = \(\) => \{

    setFocused\(true\);

    clearError\(\);

    onFocus?\.\(\);

  \};

  if \(\!visible\) return null;

  const inputClasses = classNames\(

    'dyn\-datepicker\-input',

    \`dyn\-datepicker\-$\{size\}\`,

    \{

      'dyn\-datepicker\-focused': focused,

      'dyn\-datepicker\-error': \!\!error,

      'dyn\-datepicker\-disabled': disabled,

      'dyn\-datepicker\-readonly': readonly

    \}

  \);

  return \(

    <DynFieldContainer

      label=\{label\}

      help=\{help\}

      required=\{required\}

      optional=\{optional\}

      error=\{error\}

      className=\{className\}

      htmlFor=\{name\}

    >

      <div ref=\{containerRef\} className="dyn\-datepicker\-container">

        <div className="dyn\-datepicker\-input\-container">

          <input

            ref=\{inputRef\}

            id=\{name\}

            name=\{name\}

            type="text"

            className=\{inputClasses\}

            placeholder=\{placeholder\}

            value=\{displayValue\}

            disabled=\{disabled\}

            readOnly=\{readonly\}

            onChange=\{handleInputChange\}

            onBlur=\{handleBlur\}

            onFocus=\{handleFocus\}

            aria\-invalid=\{\!\!error\}

            maxLength=\{10\}

          />

          <button

            type="button"

            className="dyn\-datepicker\-calendar\-button"

            onClick=\{handleToggleCalendar\}

            disabled=\{disabled\}

            tabIndex=\{\-1\}

            aria\-label="Abrir calend├írio"

          >

            <DynIcon icon="dyn\-icon\-calendar" />

          </button>

          \{clean && value && \!readonly && \!disabled && \(

            <button

              type="button"

              className="dyn\-datepicker\-clean\-button"

              onClick=\{handleClean\}

              tabIndex=\{\-1\}

              aria\-label="Limpar data"

            >

              <DynIcon icon="dyn\-icon\-close" />

            </button>

          \)\}

        </div>

        \{isOpen && \(

          <DatePickerCalendar

            selectedDate=\{value\}

            minDate=\{minDate\}

            maxDate=\{maxDate\}

            locale=\{locale\}

            showToday=\{showToday\}

            onSelect=\{handleCalendarSelect\}

            onClose=\{\(\) => setIsOpen\(false\)\}

          />

        \)\}

      </div>

    </DynFieldContainer>

  \);

\}\);

DynDatePicker\.displayName = 'DynDatePicker';

export default DynDatePicker;

### <a id="_Toc209713957"></a>DynFieldContainer \- Osnovni wrapper

// components/DynFieldContainer\.tsx

import React from 'react';

import classNames from 'classnames';

interface DynFieldContainerProps \{

  label?: string | null;

  help?: string;

  required?: boolean;

  optional?: boolean;

  error?: string;

  className?: string;

  htmlFor?: string;

  children: React\.ReactNode;

\}

export const DynFieldContainer: React\.FC<DynFieldContainerProps> = \(\{

  label,

  help,

  required = false,

  optional = false,

  error,

  className,

  htmlFor,

  children

\}\) => \{

  const containerClasses = classNames\(

    'dyn\-field\-container',

    \{

      'dyn\-field\-container\-error': \!\!error,

      'dyn\-field\-container\-required': required,

      'dyn\-field\-container\-optional': optional

    \},

    className

  \);

  return \(

    <div className=\{containerClasses\}>

      \{label && \(

        <label className="dyn\-field\-label" htmlFor=\{htmlFor\}>

          \{label\}

          \{required && <span className="dyn\-field\-required">\*</span>\}

          \{optional && <span className="dyn\-field\-optional">\(opcional\)</span>\}

        </label>

      \)\}

      \{children\}

      \{help && \!error && \(

        <div className="dyn\-field\-help">\{help\}</div>

      \)\}

      \{error && \(

        <div className="dyn\-field\-error" id=\{htmlFor ? \`$\{htmlFor\}\-error\` : undefined\}>

          \{error\}

        </div>

      \)\}

    </div>

  \);

\};

### <a id="_Toc209713958"></a>Validation Hook

// hooks/useFieldValidation\.ts

import \{ useState, useCallback \} from 'react';

import \{ DynFieldValidation \} from '\.\./types/field\.types';

interface UseFieldValidationProps \{

  value: any;

  required?: boolean;

  validation?: DynFieldValidation;

  customError?: string;

\}

export const useFieldValidation = \(\{ 

  value, 

  required, 

  validation, 

  customError 

\}: UseFieldValidationProps\) => \{

  const \[error, setError\] = useState<string>\(''\);

  const validate = useCallback\(\(\): boolean => \{

    if \(customError\) \{

      setError\(customError\);

      return false;

    \}

    // Required validation

    if \(required\) \{

      if \(value === undefined || value === null || value === '' || 

          \(Array\.isArray\(value\) && value\.length === 0\)\) \{

        setError\('Este camDYN├⌐ obrigat├│rio'\);

        return false;

      \}

    \}

    // Custom validation rules

    if \(validation && value \!== undefined && value \!== null && value \!== ''\) \{

      // Min length

      if \(validation\.minLength && String\(value\)\.length < validation\.minLength\) \{

        setError\(\`M├¡nimo de $\{validation\.minLength\} caracteres\`\);

        return false;

      \}

      // Max length

      if \(validation\.maxLength && String\(value\)\.length > validation\.maxLength\) \{

        setError\(\`M├íximo de $\{validation\.maxLength\} caracteres\`\);

        return false;

      \}

      // Pattern

      if \(validation\.pattern\) \{

        const regex = typeof validation\.pattern === 'string' 

          ? new RegExp\(validation\.pattern\) 

          : validation\.pattern;

        if \(\!regex\.test\(String\(value\)\)\) \{

          setError\('Formato inv├ílido'\);

          return false;

        \}

      \}

      // Custom validation function

      if \(validation\.custom\) \{

        const customError = validation\.custom\(value\);

        if \(customError\) \{

          setError\(customError\);

          return false;

        \}

      \}

    \}

    setError\(''\);

    return true;

  \}, \[value, required, validation, customError\]\);

  const clearError = useCallback\(\(\) => \{

    setError\(''\);

  \}, \[\]\);

  return \{

    error,

    validate,

    clearError

  \};

\};

### <a id="_Toc209713959"></a>CSS stilovi za Field komponente

// styles/components/\_dyn\-field\-components\.scss

// Field Container Base Styles

\.dyn\-field\-container \{

  \-\-spacing\-field: var\(\-\-spacing\-sm, 12px\);

  \-\-color\-label: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \-\-color\-help: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \-\-color\-error: var\(\-\-color\-feedback\-negative, \#f44336\);

  \-\-color\-required: var\(\-\-color\-feedback\-negative, \#f44336\);

  margin\-bottom: var\(\-\-spacing\-field\);

  &\-error \{

    \.dyn\-field\-label \{

      color: var\(\-\-color\-error\);

    \}

  \}

\}

\.dyn\-field\-label \{

  display: flex;

  align\-items: center;

  gap: 0\.25rem;

  margin\-bottom: 0\.375rem;

  font\-weight: 600;

  font\-size: 0\.875rem;

  color: var\(\-\-color\-label\);

\}

\.dyn\-field\-required \{

  color: var\(\-\-color\-required\);

  font\-size: 1em;

\}

\.dyn\-field\-optional \{

  color: var\(\-\-color\-help\);

  font\-size: 0\.75em;

  font\-style: italic;

\}

\.dyn\-field\-help \{

  margin\-top: 0\.25rem;

  font\-size: 0\.75rem;

  color: var\(\-\-color\-help\);

  line\-height: 1\.4;

\}

\.dyn\-field\-error \{

  margin\-top: 0\.25rem;

  font\-size: 0\.75rem;

  color: var\(\-\-color\-error\);

  line\-height: 1\.4;

\}

// Input Styles

\.dyn\-input\-container \{

  position: relative;

  display: flex;

  align\-items: center;

\}

\.dyn\-input \{

  \-\-border\-radius: var\(\-\-border\-radius\-md, 4px\);

  \-\-border\-width: var\(\-\-border\-width\-sm, 1px\);

  \-\-border\-color: var\(\-\-color\-neutral\-mid\-40, \#999\);

  \-\-border\-color\-focused: var\(\-\-color\-action\-default, \#0066cc\);

  \-\-border\-color\-error: var\(\-\-color\-feedback\-negative, \#f44336\);

  \-\-background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  \-\-color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \-\-padding: 0\.75rem;

  width: 100%;

  padding: var\(\-\-padding\);

  background: var\(\-\-background\);

  border: var\(\-\-border\-width\) solid var\(\-\-border\-color\);

  border\-radius: var\(\-\-border\-radius\);

  color: var\(\-\-color\);

  font\-size: 0\.875rem;

  line\-height: 1\.25;

  transition: border\-color 0\.2s ease, box\-shadow 0\.2s ease;

  &::placeholder \{

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  \}

  &:focus \{

    outline: none;

    border\-color: var\(\-\-border\-color\-focused\);

    box\-shadow: 0 0 0 2px rgba\(0, 102, 204, 0\.2\);

  \}

  &\-small \{

    \-\-padding: 0\.5rem;

    font\-size: 0\.8125rem;

  \}

  &\-large \{

    \-\-padding: 1rem;

    font\-size: 1rem;

  \}

  &\-error \{

    border\-color: var\(\-\-border\-color\-error\);

    &:focus \{

      border\-color: var\(\-\-border\-color\-error\);

      box\-shadow: 0 0 0 2px rgba\(244, 67, 54, 0\.2\);

    \}

  \}

  &\-disabled \{

    background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    cursor: not\-allowed;

    &::placeholder \{

      color: var\(\-\-color\-neutral\-mid\-40, \#999\);

    \}

  \}

  &\-readonly \{

    background\-color: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

    cursor: default;

  \}

  &\-with\-icon \{

    padding\-left: 2\.5rem;

  \}

  &\-cleanable \{

    padding\-right: 2\.5rem;

  \}

\}

\.dyn\-input\-icon\-container \{

  position: absolute;

  left: 0\.75rem;

  display: flex;

  align\-items: center;

  color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  pointer\-events: none;

\}

\.dyn\-input\-clean\-button \{

  position: absolute;

  right: 0\.5rem;

  padding: 0\.25rem;

  background: none;

  border: none;

  color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  cursor: pointer;

  border\-radius: 50%;

  display: flex;

  align\-items: center;

  justify\-content: center;

  &:hover \{

    background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \}

\}

// Select Styles

\.dyn\-select\-container \{

  position: relative;

\}

\.dyn\-select \{

  position: relative;

  width: 100%;

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: var\(\-\-border\-width\-sm, 1px\) solid var\(\-\-color\-neutral\-mid\-40, \#999\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  cursor: pointer;

  transition: border\-color 0\.2s ease, box\-shadow 0\.2s ease;

  &:focus \{

    outline: none;

    border\-color: var\(\-\-color\-action\-default, \#0066cc\);

    box\-shadow: 0 0 0 2px rgba\(0, 102, 204, 0\.2\);

  \}

  &\-error \{

    border\-color: var\(\-\-color\-feedback\-negative, \#f44336\);

    &:focus \{

      border\-color: var\(\-\-color\-feedback\-negative, \#f44336\);

      box\-shadow: 0 0 0 2px rgba\(244, 67, 54, 0\.2\);

    \}

  \}

  &\-disabled \{

    background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    cursor: not\-allowed;

    \.dyn\-select\-content \{

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    \}

  \}

\}

\.dyn\-select\-content \{

  padding: 0\.75rem;

  display: flex;

  align\-items: center;

  min\-height: 1\.25rem;

  color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  &\.dyn\-select\-placeholder \{

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  \}

\}

\.dyn\-select\-arrow \{

  position: absolute;

  right: 0\.75rem;

  top: 50%;

  transform: translateY\(\-50%\);

  color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  transition: transform 0\.2s ease;

  &\-up \{

    transform: translateY\(\-50%\) rotate\(180deg\);

  \}

\}

\.dyn\-select\-dropdown \{

  position: absolute;

  top: 100%;

  left: 0;

  right: 0;

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  box\-shadow: var\(\-\-shadow\-md, 0 4px 16px rgba\(0,0,0,0\.15\)\);

  z\-index: 1000;

  margin\-top: 4px;

  max\-height: 200px;

  overflow: hidden;

\}

\.dyn\-select\-search \{

  padding: 0\.5rem;

  border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

\}

\.dyn\-select\-search\-input \{

  width: 100%;

  padding: 0\.5rem;

  border: 1px solid var\(\-\-color\-neutral\-light\-30, \#d0d0d0\);

  border\-radius: var\(\-\-border\-radius\-sm, 2px\);

  font\-size: 0\.875rem;

  &:focus \{

    outline: none;

    border\-color: var\(\-\-color\-action\-default, \#0066cc\);

  \}

\}

\.dyn\-select\-options \{

  max\-height: 150px;

  overflow\-y: auto;

\}

\.dyn\-select\-option \{

  padding: 0\.75rem;

  cursor: pointer;

  color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

  &:last\-child \{

    border\-bottom: none;

  \}

  &:hover:not\(\.dyn\-select\-option\-disabled\) \{

    background\-color: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

  \}

  &\-selected \{

    background\-color: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

    color: var\(\-\-color\-action\-default, \#0066cc\);

  \}

  &\-disabled \{

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    cursor: not\-allowed;

    opacity: 0\.6;

  \}

\}

\.dyn\-select\-empty \{

  padding: 0\.75rem;

  text\-align: center;

  color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  font\-style: italic;

\}

// Checkbox Styles

\.dyn\-checkbox\-container \{

  display: flex;

  align\-items: flex\-start;

  gap: 0\.5rem;

  cursor: pointer;

  line\-height: 1\.25;

\}

\.dyn\-checkbox\-input \{

  position: absolute;

  opacity: 0;

  width: 0;

  height: 0;

\}

\.dyn\-checkbox \{

  position: relative;

  width: 1\.125rem;

  height: 1\.125rem;

  border: 2px solid var\(\-\-color\-neutral\-mid\-40, \#999\);

  border\-radius: var\(\-\-border\-radius\-sm, 2px\);

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  flex\-shrink: 0;

  transition: all 0\.2s ease;

  &\-checked \{

    background: var\(\-\-color\-action\-default, \#0066cc\);

    border\-color: var\(\-\-color\-action\-default, \#0066cc\);

  \}

  &\-indeterminate \{

    background: var\(\-\-color\-action\-default, \#0066cc\);

    border\-color: var\(\-\-color\-action\-default, \#0066cc\);

  \}

  &\-error \{

    border\-color: var\(\-\-color\-feedback\-negative, \#f44336\);

  \}

  &\-disabled \{

    background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    border\-color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    \.dyn\-checkbox\-checkmark \{

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    \}

  \}

  &\-small \{

    width: 1rem;

    height: 1rem;

  \}

  &\-large \{

    width: 1\.25rem;

    height: 1\.25rem;

  \}

\}

\.dyn\-checkbox\-checkmark \{

  position: absolute;

  top: 50%;

  left: 50%;

  transform: translate\(\-50%, \-50%\);

  color: white;

  font\-size: 0\.75rem;

  font\-weight: bold;

  opacity: 0;

  transition: opacity 0\.2s ease;

  \.dyn\-checkbox\-checked &,

  \.dyn\-checkbox\-indeterminate & \{

    opacity: 1;

  \}

\}

\.dyn\-checkbox\-label \{

  color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  cursor: pointer;

  user\-select: none;

\}

// DatePicker Styles

\.dyn\-datepicker\-container \{

  position: relative;

\}

\.dyn\-datepicker\-input\-container \{

  position: relative;

  display: flex;

  align\-items: center;

\}

\.dyn\-datepicker\-input \{

  @extend \.dyn\-input;

  padding\-right: 2\.5rem;

\}

\.dyn\-datepicker\-calendar\-button \{

  position: absolute;

  right: 0\.5rem;

  padding: 0\.25rem;

  background: none;

  border: none;

  color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  cursor: pointer;

  border\-radius: 50%;

  display: flex;

  align\-items: center;

  justify\-content: center;

  &:hover:not\(:disabled\) \{

    background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \}

  &:disabled \{

    cursor: not\-allowed;

    opacity: 0\.5;

  \}

\}

\.dyn\-datepicker\-clean\-button \{

  position: absolute;

  right: 2rem;

  padding: 0\.25rem;

  background: none;

  border: none;

  color: var\(\-\-color\-neutral\-mid\-60, \#999\);

  cursor: pointer;

  border\-radius: 50%;

  display: flex;

  align\-items: center;

  justify\-content: center;

  &:hover \{

    background\-color: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \}

\}

// Size Variants

\.dyn\-field\-small \.dyn\-input,

\.dyn\-field\-small \.dyn\-select\-content,

\.dyn\-field\-small \.dyn\-datepicker\-input \{

  padding: 0\.5rem;

  font\-size: 0\.8125rem;

\}

\.dyn\-field\-large \.dyn\-input,

\.dyn\-field\-large \.dyn\-select\-content,

\.dyn\-field\-large \.dyn\-datepicker\-input \{

  padding: 1rem;

  font\-size: 1rem;

\}

// Responsive

@media \(max\-width: 768px\) \{

  \.dyn\-field\-container \{

    margin\-bottom: 1rem;

  \}

  \.dyn\-input,

  \.dyn\-select\-content,

  \.dyn\-datepicker\-input \{

    font\-size: 1rem; // Prevent zoom on mobile

  \}

\}

Ovom implementacijom pokrivam osnovne Field komponente koje ─ìine srce bilo kog form sistema\. Komponente podr┼╛avaju:

1. \*\*Unified validation sistem\*\* sa custom hook\-om
2. \*\*Mask support\*\* za formatiranje input\-a
3. \*\*Accessibility\*\* sa proper ARIA atributes
4. \*\*Responsive dizajn\*\* optimizovan za mobile
5. \*\*Consistent styling\*\* sa CSS custom properties

┼╜elite li da nastavim sa slede─çom grupom komponenti ili da detaljnije razradim neki od naprednih field tipova poput Upload ili Rich Text komponenti?

## <a id="_Toc209713960"></a>Grupa 6: Navigation komponente \(Menu, Breadcrumb, Stepper, Tabs, Toolbar\)

### <a id="_Toc209713961"></a>DYNMenu \- Implementacija u React/TypeScript

#### <a id="_Toc209713962"></a>Angular interface:

interface DynMenuProps \{

  menus: Array<DynMenuItem>;

  collapsed?: boolean;

  collapsedIcon?: string | TemplateRef<void>;

  filter?: boolean;

  shortLogo?: string;

  logo?: string;

  literals?: DynMenuLiterals;

  automaticToggle?: boolean;

  onCollapse?: \(\) => void;

\}

interface DynMenuItem \{

  label: string;

  icon?: string | TemplateRef<void>;

  shortLabel?: string;

  link?: string;

  action?: Function;

  badge?: DynMenuBadge;

  subItems?: Array<DynMenuItem>;

\}

#### <a id="_Toc209713963"></a>React/TypeScript implementacija:

// types/menu\.types\.ts

export interface MenuBadge \{

  value?: number;

  color?: string;

\}

export interface MenuItem \{

  label: string;

  icon?: string | React\.ReactNode;

  shortLabel?: string;

  link?: string;

  action?: \(\) => void;

  badge?: MenuBadge;

  subItems?: MenuItem\[\];

  disabled?: boolean;

  visible?: boolean;

  type?: 'divider' | 'item';

\}

export interface MenuLiterals \{

  collapse: string;

  expand: string;

  search: string;

\}

export interface DynMenuProps \{

  menus: MenuItem\[\];

  collapsed?: boolean;

  collapsedIcon?: string | React\.ReactNode;

  filter?: boolean;

  shortLogo?: string;

  logo?: string;

  literals?: Partial<MenuLiterals>;

  automaticToggle?: boolean;

  className?: string;

  onCollapse?: \(collapsed: boolean\) => void;

  onMenuClick?: \(item: MenuItem\) => void;

\}

export interface DynMenuRef \{

  collapse\(\): void;

  expand\(\): void;

  toggle\(\): void;

\}

// components/DynMenu\.tsx

import React, \{ 

  forwardRef, 

  useImperativeHandle, 

  useState, 

  useEffect, 

  useMemo 

\} from 'react';

import classNames from 'classnames';

import \{ DynMenuProps, MenuItem, MenuLiterals, DynMenuRef \} from '\.\./types/menu\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynBadge \} from '\./DynBadge';

import \{ DynInput \} from '\./DynInput';

const defaultLiterals: MenuLiterals = \{

  collapse: 'Retrair menu',

  expand: 'Expandir menu',

  search: 'Pesquisar'

\};

const DynMenu = forwardRef<DynMenuRef, DynMenuProps>\(\(\{

  menus = \[\],

  collapsed: propCollapsed = false,

  collapsedIcon = 'dyn\-icon\-menu',

  filter = false,

  shortLogo,

  logo,

  literals: customLiterals = \{\},

  automaticToggle = true,

  className,

  onCollapse,

  onMenuClick

\}, ref\) => \{

  const \[collapsed, setCollapsed\] = useState\(propCollapsed\);

  const \[expandedItems, setExpandedItems\] = useState<Set<string>>\(new Set\(\)\);

  const \[filterText, setFilterText\] = useState\(''\);

  const \[activeItem, setActiveItem\] = useState<string>\(''\);

  const literals = \{ \.\.\.defaultLiterals, \.\.\.customLiterals \};

  useImperativeHandle\(ref, \(\) => \(\{

    collapse\(\) \{

      setCollapsed\(true\);

      onCollapse?\.\(true\);

    \},

    expand\(\) \{

      setCollapsed\(false\);

      onCollapse?\.\(false\);

    \},

    toggle\(\) \{

      const newCollapsed = \!collapsed;

      setCollapsed\(newCollapsed\);

      onCollapse?\.\(newCollapsed\);

    \}

  \}\)\);

  useEffect\(\(\) => \{

    setCollapsed\(propCollapsed\);

  \}, \[propCollapsed\]\);

  useEffect\(\(\) => \{

    const handleResize = \(\) => \{

      if \(automaticToggle\) \{

        setCollapsed\(window\.innerWidth < 768\);

      \}

    \};

    if \(automaticToggle\) \{

      window\.addEventListener\('resize', handleResize\);

      handleResize\(\); // Initial check

    \}

    return \(\) => \{

      window\.removeEventListener\('resize', handleResize\);

    \};

  \}, \[automaticToggle\]\);

  const filteredMenus = useMemo\(\(\) => \{

    if \(\!filterText\) return menus;

    const filterItems = \(items: MenuItem\[\]\): MenuItem\[\] => \{

      return items\.reduce\(\(acc: MenuItem\[\], item\) => \{

        if \(item\.type === 'divider'\) \{

          acc\.push\(item\);

          return acc;

        \}

        const matchesFilter = item\.label\.toLowerCase\(\)\.includes\(filterText\.toLowerCase\(\)\) ||

                            item\.shortLabel?\.toLowerCase\(\)\.includes\(filterText\.toLowerCase\(\)\);

        if \(matchesFilter\) \{

          acc\.push\(item\);

        \} else if \(item\.subItems\) \{

          const filteredSubItems = filterItems\(item\.subItems\);

          if \(filteredSubItems\.length > 0\) \{

            acc\.push\(\{

              \.\.\.item,

              subItems: filteredSubItems

            \}\);

          \}

        \}

        return acc;

      \}, \[\]\);

    \};

    return filterItems\(menus\);

  \}, \[menus, filterText\]\);

  const handleToggleCollapse = \(\) => \{

    const newCollapsed = \!collapsed;

    setCollapsed\(newCollapsed\);

    onCollapse?\.\(newCollapsed\);

  \};

  const handleItemClick = \(item: MenuItem, path: string\) => \{

    if \(item\.disabled\) return;

    setActiveItem\(path\);

    if \(item\.subItems && item\.subItems\.length > 0\) \{

      setExpandedItems\(prev => \{

        const newSet = new Set\(prev\);

        if \(newSet\.has\(path\)\) \{

          newSet\.delete\(path\);

        \} else \{

          newSet\.add\(path\);

        \}

        return newSet;

      \}\);

    \} else \{

      if \(item\.action\) \{

        item\.action\(\);

      \} else if \(item\.link\) \{

        window\.location\.href = item\.link;

      \}

      onMenuClick?\.\(item\);

    \}

  \};

  const renderMenuItem = \(item: MenuItem, level = 0, parentPath = ''\): React\.ReactNode => \{

    if \(\!item\.visible && item\.visible \!== undefined\) return null;

    const path = \`$\{parentPath\}/$\{item\.label\}\`;

    const isExpanded = expandedItems\.has\(path\);

    const isActive = activeItem === path;

    const hasSubItems = item\.subItems && item\.subItems\.length > 0;

    if \(item\.type === 'divider'\) \{

      return \(

        <div key=\{path\} className="dyn\-menu\-divider" />

      \);

    \}

    const itemClasses = classNames\('dyn\-menu\-item', \{

      'dyn\-menu\-item\-active': isActive,

      'dyn\-menu\-item\-expanded': isExpanded,

      'dyn\-menu\-item\-disabled': item\.disabled,

      'dyn\-menu\-item\-with\-sub': hasSubItems,

      \[\`dyn\-menu\-item\-level\-$\{level\}\`\]: level > 0

    \}\);

    return \(

      <div key=\{path\} className="dyn\-menu\-item\-container">

        <div

          className=\{itemClasses\}

          onClick=\{\(\) => handleItemClick\(item, path\)\}

          role="menuitem"

          tabIndex=\{item\.disabled ? \-1 : 0\}

          aria\-expanded=\{hasSubItems ? isExpanded : undefined\}

        >

          <div className="dyn\-menu\-item\-content">

            \{item\.icon && \(

              <div className="dyn\-menu\-item\-icon">

                \{typeof item\.icon === 'string' ? 

                  <DynIcon icon=\{item\.icon\} /> : 

                  item\.icon

                \}

              </div>

            \)\}

            <span className="dyn\-menu\-item\-label">

              \{collapsed && item\.shortLabel ? item\.shortLabel : item\.label\}

            </span>

            \{item\.badge && \(

              <div className="dyn\-menu\-item\-badge">

                <DynBadge

                  value=\{item\.badge\.value\}

                  color=\{item\.badge\.color\}

                  size="small"

                />

              </div>

            \)\}

            \{hasSubItems && \(

              <div className="dyn\-menu\-item\-arrow">

                <DynIcon 

                  icon="dyn\-icon\-arrow\-down"

                  className=\{classNames\(\{

                    'dyn\-menu\-arrow\-expanded': isExpanded

                  \}\)\}

                />

              </div>

            \)\}

          </div>

        </div>

        \{hasSubItems && isExpanded && \(

          <div className="dyn\-menu\-subitems">

            \{item\.subItems\!\.map\(subItem => 

              renderMenuItem\(subItem, level \+ 1, path\)

            \)\}

          </div>

        \)\}

      </div>

    \);

  \};

  const menuClasses = classNames\(

    'dyn\-menu',

    \{

      'dyn\-menu\-collapsed': collapsed

    \},

    className

  \);

  return \(

    <nav className=\{menuClasses\} role="navigation">

      <div className="dyn\-menu\-header">

        <div className="dyn\-menu\-logo">

          \{collapsed && shortLogo ? \(

            <img src=\{shortLogo\} alt="Logo" className="dyn\-menu\-logo\-image" />

          \) : logo ? \(

            <img src=\{logo\} alt="Logo" className="dyn\-menu\-logo\-image" />

          \) : null\}

        </div>

        <button

          className="dyn\-menu\-toggle"

          onClick=\{handleToggleCollapse\}

          aria\-label=\{collapsed ? literals\.expand : literals\.collapse\}

        >

          \{typeof collapsedIcon === 'string' ? 

            <DynIcon icon=\{collapsedIcon\} /> : 

            collapsedIcon

          \}

        </button>

      </div>

      \{filter && \!collapsed && \(

        <div className="dyn\-menu\-filter">

          <DynInput

            placeholder=\{literals\.search\}

            value=\{filterText\}

            onChange=\{setFilterText\}

            icon="dyn\-icon\-search"

            size="small"

          />

        </div>

      \)\}

      <div className="dyn\-menu\-content">

        <div className="dyn\-menu\-items" role="menu">

          \{filteredMenus\.map\(item => renderMenuItem\(item\)\)\}

        </div>

      </div>

    </nav>

  \);

\}\);

DynMenu\.displayName = 'DynMenu';

export default DynMenu;

### <a id="_Toc209713964"></a>DYNBreadcrumb \- Implementacija u React/TypeScript

// types/breadcrumb\.types\.ts

export interface BreadcrumbItem \{

  label: string;

  link?: string;

  action?: \(\) => void;

\}

export interface DynBreadcrumbProps \{

  items: BreadcrumbItem\[\];

  favorite?: boolean;

  favoriteService?: string;

  className?: string;

  onFavorite?: \(favorited: boolean\) => void;

\}

// components/DynBreadcrumb\.tsx

import React, \{ useState \} from 'react';

import classNames from 'classnames';

import \{ DynBreadcrumbProps, BreadcrumbItem \} from '\.\./types/breadcrumb\.types';

import \{ DynIcon \} from '\./DynIcon';

const DynBreadcrumb: React\.FC<DynBreadcrumbProps> = \(\{

  items = \[\],

  favorite = false,

  favoriteService,

  className,

  onFavorite

\}\) => \{

  const \[isFavorited, setIsFavorited\] = useState\(favorite\);

  const handleItemClick = \(item: BreadcrumbItem, e: React\.MouseEvent\) => \{

    if \(item\.action\) \{

      e\.preventDefault\(\);

      item\.action\(\);

    \}

  \};

  const handleFavoriteToggle = async \(\) => \{

    const newFavorited = \!isFavorited;

    if \(favoriteService\) \{

      try \{

        // Call API to update favorite status

        const response = await fetch\(favoriteService, \{

          method: 'POST',

          headers: \{ 'Content\-Type': 'application/json' \},

          body: JSON\.stringify\(\{ favorited: newFavorited \}\)

        \}\);

        if \(response\.ok\) \{

          setIsFavorited\(newFavorited\);

          onFavorite?\.\(newFavorited\);

        \}

      \} catch \(error\) \{

        console\.error\('Failed to update favorite:', error\);

      \}

    \} else \{

      setIsFavorited\(newFavorited\);

      onFavorite?\.\(newFavorited\);

    \}

  \};

  const breadcrumbClasses = classNames\('dyn\-breadcrumb', className\);

  if \(items\.length === 0\) return null;

  return \(

    <nav className=\{breadcrumbClasses\} aria\-label="Breadcrumb">

      <ol className="dyn\-breadcrumb\-list">

        \{items\.map\(\(item, index\) => \{

          const isLast = index === items\.length \- 1;

          return \(

            <li key=\{index\} className="dyn\-breadcrumb\-item">

              \{item\.link && \!isLast ? \(

                <a

                  href=\{item\.link\}

                  className="dyn\-breadcrumb\-link"

                  onClick=\{\(e\) => handleItemClick\(item, e\)\}

                >

                  \{item\.label\}

                </a>

              \) : \(

                <span 

                  className=\{classNames\('dyn\-breadcrumb\-text', \{

                    'dyn\-breadcrumb\-current': isLast

                  \}\)\}

                >

                  \{item\.label\}

                </span>

              \)\}

              \{\!isLast && \(

                <span className="dyn\-breadcrumb\-separator">

                  <DynIcon icon="dyn\-icon\-arrow\-right" />

                </span>

              \)\}

            </li>

          \);

        \}\)\}

        \{\(favorite \!== undefined || favoriteService\) && \(

          <li className="dyn\-breadcrumb\-favorite">

            <button

              className=\{classNames\('dyn\-breadcrumb\-favorite\-button', \{

                'dyn\-breadcrumb\-favorite\-active': isFavorited

              \}\)\}

              onClick=\{handleFavoriteToggle\}

              aria\-label=\{isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'\}

            >

              <DynIcon 

                icon=\{isFavorited ? 'dyn\-icon\-star\-filled' : 'dyn\-icon\-star'\} 

              />

            </button>

          </li>

        \)\}

      </ol>

    </nav>

  \);

\};

export default DynBreadcrumb;

### <a id="_Toc209713965"></a>DYNStepper \- Implementa├º├úo em React/TypeScript

// types/stepper\.types\.ts

export type StepStatus = 'default' | 'active' | 'done' | 'disabled' | 'error';

export interface Step \{

  label: string;

  status?: StepStatus;

  iconDefault?: string;

  iconDone?: string;

  iconActive?: string;

\}

export interface DynStepperProps \{

  steps: Step\[\];

  step?: number;

  orientation?: 'horizontal' | 'vertical';

  size?: 'medium' | 'large';

  className?: string;

  onStepClick?: \(step: number\) => void;

\}

// components/DynStepper\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynStepperProps, Step, StepStatus \} from '\.\./types/stepper\.types';

import \{ DynIcon \} from '\./DynIcon';

const DynStepper: React\.FC<DynStepperProps> = \(\{

  steps = \[\],

  step = 1,

  orientation = 'horizontal',

  size = 'medium',

  className,

  onStepClick

\}\) => \{

  const getStepStatus = \(stepIndex: number, stepData: Step\): StepStatus => \{

    if \(stepData\.status\) return stepData\.status;

    if \(stepIndex \+ 1 < step\) return 'done';

    if \(stepIndex \+ 1 === step\) return 'active';

    return 'default';

  \};

  const getStepIcon = \(stepData: Step, status: StepStatus, stepNumber: number\): React\.ReactNode => \{

    switch \(status\) \{

      case 'done':

        return stepData\.iconDone ? 

          <DynIcon icon=\{stepData\.iconDone\} /> : 

          <DynIcon icon="dyn\-icon\-ok" />;

      case 'active':

        return stepData\.iconActive ? 

          <DynIcon icon=\{stepData\.iconActive\} /> : 

          <span className="dyn\-stepper\-step\-number">\{stepNumber\}</span>;

      case 'error':

        return <DynIcon icon="dyn\-icon\-close" />;

      default:

        return stepData\.iconDefault ? 

          <DynIcon icon=\{stepData\.iconDefault\} /> : 

          <span className="dyn\-stepper\-step\-number">\{stepNumber\}</span>;

    \}

  \};

  const handleStepClick = \(stepIndex: number\) => \{

    const status = getStepStatus\(stepIndex, steps\[stepIndex\]\);

    if \(status \!== 'disabled' && onStepClick\) \{

      onStepClick\(stepIndex \+ 1\);

    \}

  \};

  const stepperClasses = classNames\(

    'dyn\-stepper',

    \`dyn\-stepper\-$\{orientation\}\`,

    \`dyn\-stepper\-$\{size\}\`,

    className

  \);

  return \(

    <div className=\{stepperClasses\}>

      <ol className="dyn\-stepper\-list">

        \{steps\.map\(\(stepData, index\) => \{

          const status = getStepStatus\(index, stepData\);

          const isClickable = status \!== 'disabled' && onStepClick;

          const stepClasses = classNames\(

            'dyn\-stepper\-step',

            \`dyn\-stepper\-step\-$\{status\}\`,

            \{

              'dyn\-stepper\-step\-clickable': isClickable

            \}

          \);

          return \(

            <li key=\{index\} className=\{stepClasses\}>

              <div

                className="dyn\-stepper\-step\-content"

                onClick=\{isClickable ? \(\) => handleStepClick\(index\) : undefined\}

                role=\{isClickable ? 'button' : undefined\}

                tabIndex=\{isClickable ? 0 : undefined\}

                onKeyDown=\{isClickable ? \(e\) => \{

                  if \(e\.key === 'Enter' || e\.key === ' '\) \{

                    e\.preventDefault\(\);

                    handleStepClick\(index\);

                  \}

                \} : undefined\}

              >

                <div className="dyn\-stepper\-step\-icon">

                  \{getStepIcon\(stepData, status, index \+ 1\)\}

                </div>

                <div className="dyn\-stepper\-step\-label">

                  \{stepData\.label\}

                </div>

              </div>

              \{index < steps\.length \- 1 && \(

                <div className="dyn\-stepper\-step\-separator" />

              \)\}

            </li>

          \);

        \}\)\}

      </ol>

    </div>

  \);

\};

export default DynStepper;

### <a id="_Toc209713966"></a>DYNTabs \- Implementa├º├úo em React/TypeScript

// types/tabs\.types\.ts

export interface TabItem \{

  label: string;

  active?: boolean;

  disabled?: boolean;

  hide?: boolean;

  removable?: boolean;

  icon?: string;

  badge?: number;

  id?: string;

\}

export interface DynTabsProps \{

  tabs: TabItem\[\];

  small?: boolean;

  className?: string;

  onActiveTab?: \(tab: TabItem\) => void;

  onRemoveTab?: \(tab: TabItem\) => void;

\}

// components/DynTabs\.tsx

import React, \{ useState, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynTabsProps, TabItem \} from '\.\./types/tabs\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynBadge \} from '\./DynBadge';

const DynTabs: React\.FC<DynTabsProps> = \(\{

  tabs = \[\],

  small = false,

  className,

  onActiveTab,

  onRemoveTab

\}\) => \{

  const \[activeTabId, setActiveTabId\] = useState<string>\(''\);

  useEffect\(\(\) => \{

    // Set initial active tab

    const activeTab = tabs\.find\(tab => tab\.active && \!tab\.hide\) || 

                     tabs\.find\(tab => \!tab\.hide\);

    if \(activeTab\) \{

      const tabId = activeTab\.id || activeTab\.label;

      setActiveTabId\(tabId\);

    \}

  \}, \[tabs\]\);

  const handleTabClick = \(tab: TabItem\) => \{

    if \(tab\.disabled || tab\.hide\) return;

    const tabId = tab\.id || tab\.label;

    setActiveTabId\(tabId\);

    onActiveTab?\.\(tab\);

  \};

  const handleRemoveTab = \(tab: TabItem, e: React\.MouseEvent\) => \{

    e\.stopPropagation\(\);

    onRemoveTab?\.\(tab\);

  \};

  const visibleTabs = tabs\.filter\(tab => \!tab\.hide\);

  const tabsClasses = classNames\(

    'dyn\-tabs',

    \{

      'dyn\-tabs\-small': small

    \},

    className

  \);

  return \(

    <div className=\{tabsClasses\}>

      <div className="dyn\-tabs\-header">

        <div className="dyn\-tabs\-list" role="tablist">

          \{visibleTabs\.map\(\(tab, index\) => \{

            const tabId = tab\.id || tab\.label;

            const isActive = tabId === activeTabId;

            const tabClasses = classNames\(

              'dyn\-tabs\-tab',

              \{

                'dyn\-tabs\-tab\-active': isActive,

                'dyn\-tabs\-tab\-disabled': tab\.disabled,

                'dyn\-tabs\-tab\-removable': tab\.removable

              \}

            \);

            return \(

              <button

                key=\{tabId\}

                className=\{tabClasses\}

                role="tab"

                aria\-selected=\{isActive\}

                aria\-controls=\{\`panel\-$\{tabId\}\`\}

                id=\{\`tab\-$\{tabId\}\`\}

                disabled=\{tab\.disabled\}

                onClick=\{\(\) => handleTabClick\(tab\)\}

              >

                <div className="dyn\-tabs\-tab\-content">

                  \{tab\.icon && \(

                    <div className="dyn\-tabs\-tab\-icon">

                      <DynIcon icon=\{tab\.icon\} />

                    </div>

                  \)\}

                  <span className="dyn\-tabs\-tab\-label">

                    \{tab\.label\}

                  </span>

                  \{tab\.badge && tab\.badge > 0 && \(

                    <div className="dyn\-tabs\-tab\-badge">

                      <DynBadge value=\{tab\.badge\} size="small" />

                    </div>

                  \)\}

                  \{tab\.removable && \(

                    <button

                      className="dyn\-tabs\-tab\-remove"

                      onClick=\{\(e\) => handleRemoveTab\(tab, e\)\}

                      aria\-label=\{\`Remover aba $\{tab\.label\}\`\}

                    >

                      <DynIcon icon="dyn\-icon\-close" />

                    </button>

                  \)\}

                </div>

              </button>

            \);

          \}\)\}

        </div>

      </div>

    </div>

  \);

\};

export default DynTabs;

### <a id="_Toc209713967"></a>DYNToolbar \- Implementa├º├úo em React/TypeScript

// types/toolbar\.types\.ts

export interface ToolbarAction \{

  label: string;

  icon?: string;

  action?: \(\) => void;

  url?: string;

  disabled?: boolean;

  separator?: boolean;

  type?: 'default' | 'danger';

  visible?: boolean;

\}

export interface DynToolbarProps \{

  title?: string;

  actions?: ToolbarAction\[\];

  profile?: \{

    title: string;

    subtitle?: string;

    avatar?: string;

  \};

  showNotification?: boolean;

  notificationNumber?: number;

  notificationActions?: ToolbarAction\[\];

  className?: string;

  onNotification?: \(\) => void;

  onProfile?: \(\) => void;

\}

// components/DynToolbar\.tsx

import React, \{ useState, useRef \} from 'react';

import classNames from 'classnames';

import \{ DynToolbarProps, ToolbarAction \} from '\.\./types/toolbar\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynBadge \} from '\./DynBadge';

import \{ DynPopup \} from '\./DynPopup';

import \{ DynAvatar \} from '\./DynAvatar';

const DynToolbar: React\.FC<DynToolbarProps> = \(\{

  title,

  actions = \[\],

  profile,

  showNotification = false,

  notificationNumber = 0,

  notificationActions = \[\],

  className,

  onNotification,

  onProfile

\}\) => \{

  const \[showNotificationPopup, setShowNotificationPopup\] = useState\(false\);

  const \[showProfilePopup, setShowProfilePopup\] = useState\(false\);

  const notificationRef = useRef<HTMLButtonElement>\(null\);

  const profileRef = useRef<HTMLButtonElement>\(null\);

  const handleActionClick = \(action: ToolbarAction\) => \{

    if \(action\.disabled\) return;

    if \(action\.action\) \{

      action\.action\(\);

    \} else if \(action\.url\) \{

      window\.location\.href = action\.url;

    \}

  \};

  const handleNotificationClick = \(\) => \{

    if \(notificationActions\.length > 0\) \{

      setShowNotificationPopup\(prev => \!prev\);

    \}

    onNotification?\.\(\);

  \};

  const handleProfileClick = \(\) => \{

    setShowProfilePopup\(prev => \!prev\);

    onProfile?\.\(\);

  \};

  const visibleActions = actions\.filter\(action => action\.visible \!== false\);

  const toolbarClasses = classNames\('dyn\-toolbar', className\);

  const renderActions = \(\) => \{

    return visibleActions\.map\(\(action, index\) => \{

      if \(action\.separator\) \{

        return <div key=\{index\} className="dyn\-toolbar\-separator" />;

      \}

      const actionClasses = classNames\(

        'dyn\-toolbar\-action',

        \{

          'dyn\-toolbar\-action\-disabled': action\.disabled,

          'dyn\-toolbar\-action\-danger': action\.type === 'danger'

        \}

      \);

      return \(

        <button

          key=\{index\}

          className=\{actionClasses\}

          disabled=\{action\.disabled\}

          onClick=\{\(\) => handleActionClick\(action\)\}

          title=\{action\.label\}

        >

          \{action\.icon && <DynIcon icon=\{action\.icon\} />\}

          <span className="dyn\-toolbar\-action\-label">\{action\.label\}</span>

        </button>

      \);

    \}\);

  \};

  return \(

    <header className=\{toolbarClasses\}>

      <div className="dyn\-toolbar\-content">

        <div className="dyn\-toolbar\-left">

          \{title && <h1 className="dyn\-toolbar\-title">\{title\}</h1>\}

        </div>

        <div className="dyn\-toolbar\-center">

          <div className="dyn\-toolbar\-actions">

            \{renderActions\(\)\}

          </div>

        </div>

        <div className="dyn\-toolbar\-right">

          \{showNotification && \(

            <div className="dyn\-toolbar\-notification">

              <button

                ref=\{notificationRef\}

                className="dyn\-toolbar\-notification\-button"

                onClick=\{handleNotificationClick\}

                aria\-label="Notifica├º├╡es"

              >

                <DynIcon icon="dyn\-icon\-notification" />

                \{notificationNumber > 0 && \(

                  <div className="dyn\-toolbar\-notification\-badge">

                    <DynBadge 

                      value=\{notificationNumber\} 

                      size="small" 

                      color="color\-07" 

                    />

                  </div>

                \)\}

              </button>

              \{showNotificationPopup && notificationActions\.length > 0 && \(

                <DynPopup

                  target=\{notificationRef\}

                  actions=\{notificationActions\.map\(action => \(\{

                    label: action\.label,

                    action: action\.action || \(\(\) => \{\}\),

                    icon: action\.icon,

                    disabled: action\.disabled

                  \}\)\)\}

                  position="bottom\-right"

                  onClose=\{\(\) => setShowNotificationPopup\(false\)\}

                />

              \)\}

            </div>

          \)\}

          \{profile && \(

            <div className="dyn\-toolbar\-profile">

              <button

                ref=\{profileRef\}

                className="dyn\-toolbar\-profile\-button"

                onClick=\{handleProfileClick\}

                aria\-label="Perfil do usu├írio"

              >

                <div className="dyn\-toolbar\-profile\-info">

                  <div className="dyn\-toolbar\-profile\-title">\{profile\.title\}</div>

                  \{profile\.subtitle && \(

                    <div className="dyn\-toolbar\-profile\-subtitle">\{profile\.subtitle\}</div>

                  \)\}

                </div>

                \{profile\.avatar ? \(

                  <DynAvatar src=\{profile\.avatar\} size="sm" alt=\{profile\.title\} />

                \) : \(

                  <div className="dyn\-toolbar\-profile\-avatar\-default">

                    <DynIcon icon="dyn\-icon\-user" />

                  </div>

                \)\}

                <DynIcon icon="dyn\-icon\-arrow\-down" className="dyn\-toolbar\-profile\-arrow" />

              </button>

              \{showProfilePopup && \(

                <DynPopup

                  target=\{profileRef\}

                  actions=\{\[

                    \{ label: 'Meu Perfil', action: \(\) => console\.log\('Profile'\) \},

                    \{ label: 'Configura├º├╡es', action: \(\) => console\.log\('Settings'\) \},

                    \{ label: 'Sair', action: \(\) => console\.log\('Logout'\), separator: true \}

                  \]\}

                  position="bottom\-right"

                  onClose=\{\(\) => setShowProfilePopup\(false\)\}

                />

              \)\}

            </div>

          \)\}

        </div>

      </div>

    </header>

  \);

\};

export default DynToolbar;

### <a id="_Toc209713968"></a>\.NET Core modeli za Navigation komponente

// Models/UI/NavigationComponentModels\.cs

namespace DynUI\.Models\.UI

\{

    // Menu Models

    public class MenuBadgeDto

    \{

        public int? Value \{ get; set; \}

        public string? Color \{ get; set; \}

    \}

    public class MenuItemDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string? Icon \{ get; set; \}

        public string? ShortLabel \{ get; set; \}

        public string? Link \{ get; set; \}

        public string? Action \{ get; set; \}

        public MenuBadgeDto? Badge \{ get; set; \}

        public List<MenuItemDto>? SubItems \{ get; set; \}

        public bool Disabled \{ get; set; \} = false;

        public bool Visible \{ get; set; \} = true;

        public string? Type \{ get; set; \} // 'divider' | 'item'

    \}

    public class MenuConfigDto

    \{

        public List<MenuItemDto> Menus \{ get; set; \} = new\(\);

        public bool Collapsed \{ get; set; \} = false;

        public string CollapsedIcon \{ get; set; \} = "dyn\-icon\-menu";

        public bool Filter \{ get; set; \} = false;

        public string? ShortLogo \{ get; set; \}

        public string? Logo \{ get; set; \}

        public bool AutomaticToggle \{ get; set; \} = true;

    \}

    // Breadcrumb Models

    public class BreadcrumbItemDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string? Link \{ get; set; \}

        public string? Action \{ get; set; \}

    \}

    public class BreadcrumbConfigDto

    \{

        public List<BreadcrumbItemDto> Items \{ get; set; \} = new\(\);

        public bool? Favorite \{ get; set; \}

        public string? FavoriteService \{ get; set; \}

    \}

    // Stepper Models

    public enum StepStatus

    \{

        Default,

        Active,

        Done,

        Disabled,

        Error

    \}

    public class StepDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public StepStatus? Status \{ get; set; \}

        public string? IconDefault \{ get; set; \}

        public string? IconDone \{ get; set; \}

        public string? IconActive \{ get; set; \}

    \}

    public class StepperConfigDto

    \{

        public List<StepDto> Steps \{ get; set; \} = new\(\);

        public int Step \{ get; set; \} = 1;

        public string Orientation \{ get; set; \} = "horizontal";

        public string Size \{ get; set; \} = "medium";

    \}

    // Tabs Models

    public class TabItemDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public bool Active \{ get; set; \} = false;

        public bool Disabled \{ get; set; \} = false;

        public bool Hide \{ get; set; \} = false;

        public bool Removable \{ get; set; \} = false;

        public string? Icon \{ get; set; \}

        public int? Badge \{ get; set; \}

        public string? Id \{ get; set; \}

    \}

    public class TabsConfigDto

    \{

        public List<TabItemDto> Tabs \{ get; set; \} = new\(\);

        public bool Small \{ get; set; \} = false;

    \}

    // Toolbar Models

    public class ToolbarActionDto

    \{

        public string Label \{ get; set; \} = string\.Empty;

        public string? Icon \{ get; set; \}

        public string? Action \{ get; set; \}

        public string? Url \{ get; set; \}

        public bool Disabled \{ get; set; \} = false;

        public bool Separator \{ get; set; \} = false;

        public string Type \{ get; set; \} = "default";

        public bool Visible \{ get; set; \} = true;

    \}

    public class ToolbarProfileDto

    \{

        public string Title \{ get; set; \} = string\.Empty;

        public string? Subtitle \{ get; set; \}

        public string? Avatar \{ get; set; \}

    \}

    public class ToolbarConfigDto

    \{

        public string? Title \{ get; set; \}

        public List<ToolbarActionDto> Actions \{ get; set; \} = new\(\);

        public ToolbarProfileDto? Profile \{ get; set; \}

        public bool ShowNotification \{ get; set; \} = false;

        public int NotificationNumber \{ get; set; \} = 0;

        public List<ToolbarActionDto> NotificationActions \{ get; set; \} = new\(\);

    \}

\}

### <a id="_Toc209713969"></a>CSS stilovi za Navigation komponente

// styles/components/\_dyn\-navigation\-components\.scss

// Menu Styles

\.dyn\-menu \{

  \-\-menu\-width: 280px;

  \-\-menu\-width\-collapsed: 64px;

  \-\-menu\-bg: var\(\-\-color\-neutral\-light\-00, \#fff\);

  \-\-menu\-border: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \-\-menu\-item\-height: 44px;

  \-\-menu\-item\-color: var\(\-\-color\-action\-default, \#0066cc\);

  \-\-menu\-item\-bg\-hover: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

  \-\-menu\-item\-bg\-active: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

  width: var\(\-\-menu\-width\);

  height: 100vh;

  background: var\(\-\-menu\-bg\);

  border\-right: 1px solid var\(\-\-menu\-border\);

  display: flex;

  flex\-direction: column;

  transition: width 0\.3s ease;

  position: fixed;

  left: 0;

  top: 0;

  z\-index: 1000;

  &\-collapsed \{

    width: var\(\-\-menu\-width\-collapsed\);

  \}

  &\-header \{

    display: flex;

    align\-items: center;

    justify\-content: space\-between;

    padding: 1rem;

    border\-bottom: 1px solid var\(\-\-menu\-border\);

    min\-height: 64px;

  \}

  &\-logo \{

    flex: 1;

    &\-image \{

      max\-height: 32px;

      max\-width: 100%;

    \}

  \}

  &\-toggle \{

    background: none;

    border: none;

    padding: 0\.5rem;

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    cursor: pointer;

    border\-radius: 50%;

    &:hover \{

      background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    \}

  \}

  &\-filter \{

    padding: 1rem;

    border\-bottom: 1px solid var\(\-\-menu\-border\);

  \}

  &\-content \{

    flex: 1;

    overflow\-y: auto;

  \}

  &\-items \{

    padding: 0\.5rem 0;

  \}

  &\-item \{

    &\-container \{

      margin: 0;

    \}

    position: relative;

    display: flex;

    align\-items: center;

    height: var\(\-\-menu\-item\-height\);

    padding: 0 1rem;

    color: var\(\-\-menu\-item\-color\);

    cursor: pointer;

    transition: background\-color 0\.2s ease;

    user\-select: none;

    &:hover:not\(\.dyn\-menu\-item\-disabled\) \{

      background: var\(\-\-menu\-item\-bg\-hover\);

    \}

    &\-active \{

      background: var\(\-\-menu\-item\-bg\-active\);

      font\-weight: 600;

    \}

    &\-disabled \{

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      cursor: not\-allowed;

      opacity: 0\.6;

    \}

    &\-content \{

      display: flex;

      align\-items: center;

      width: 100%;

      min\-width: 0;

    \}

    &\-icon \{

      width: 20px;

      height: 20px;

      margin\-right: 0\.75rem;

      flex\-shrink: 0;

      display: flex;

      align\-items: center;

      justify\-content: center;

    \}

    &\-label \{

      flex: 1;

      white\-space: nowrap;

      overflow: hidden;

      text\-overflow: ellipsis;

      font\-size: 0\.875rem;

      \.dyn\-menu\-collapsed & \{

        display: none;

      \}

    \}

    &\-badge \{

      margin\-left: auto;

      margin\-right: 0\.5rem;

      \.dyn\-menu\-collapsed & \{

        display: none;

      \}

    \}

    &\-arrow \{

      margin\-left: auto;

      transition: transform 0\.2s ease;

      \.dyn\-menu\-collapsed & \{

        display: none;

      \}

      &\-expanded \{

        transform: rotate\(180deg\);

      \}

    \}

    &\-level\-1 \{

      padding\-left: 3rem;

    \}

    &\-level\-2 \{

      padding\-left: 4rem;

    \}

  \}

  &\-subitems \{

    background: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

  \}

  &\-divider \{

    height: 1px;

    background: var\(\-\-menu\-border\);

    margin: 0\.5rem 1rem;

  \}

\}

// Breadcrumb Styles

\.dyn\-breadcrumb \{

  padding: 0\.75rem 0;

  &\-list \{

    display: flex;

    align\-items: center;

    list\-style: none;

    margin: 0;

    padding: 0;

    font\-size: 0\.875rem;

  \}

  &\-item \{

    display: flex;

    align\-items: center;

  \}

  &\-link \{

    color: var\(\-\-color\-action\-default, \#0066cc\);

    text\-decoration: none;

    &:hover \{

      text\-decoration: underline;

    \}

  \}

  &\-text \{

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-current \{

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-weight: 600;

  \}

  &\-separator \{

    margin: 0 0\.5rem;

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    font\-size: 0\.75rem;

  \}

  &\-favorite \{

    margin\-left: 1rem;

    &\-button \{

      background: none;

      border: none;

      padding: 0\.25rem;

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      cursor: pointer;

      &:hover \{

        color: var\(\-\-color\-warning\-default, \#ff9800\);

      \}

      &\.dyn\-breadcrumb\-favorite\-active \{

        color: var\(\-\-color\-warning\-default, \#ff9800\);

      \}

    \}

  \}

\}

// Stepper Styles

\.dyn\-stepper \{

  &\-horizontal \{

    \.dyn\-stepper\-list \{

      display: flex;

      align\-items: center;

    \}

    \.dyn\-stepper\-step \{

      flex: 1;

      display: flex;

      align\-items: center;

      &:last\-child \{

        flex: 0;

      \}

    \}

    \.dyn\-stepper\-step\-separator \{

      flex: 1;

      height: 2px;

      background: var\(\-\-color\-neutral\-light\-30, \#d0d0d0\);

      margin: 0 1rem;

    \}

  \}

  &\-vertical \{

    \.dyn\-stepper\-list \{

      display: flex;

      flex\-direction: column;

    \}

    \.dyn\-stepper\-step \{

      display: flex;

      padding\-bottom: 2rem;

      &:last\-child \{

        padding\-bottom: 0;

      \}

    \}

    \.dyn\-stepper\-step\-content \{

      display: flex;

      align\-items: flex\-start;

    \}

    \.dyn\-stepper\-step\-label \{

      margin\-left: 1rem;

      margin\-top: 0\.25rem;

    \}

    \.dyn\-stepper\-step\-separator \{

      position: absolute;

      left: 50%;

      top: 3rem;

      width: 2px;

      height: calc\(100% \- 3rem\);

      background: var\(\-\-color\-neutral\-light\-30, \#d0d0d0\);

      transform: translateX\(\-50%\);

    \}

  \}

  &\-list \{

    list\-style: none;

    margin: 0;

    padding: 0;

  \}

  &\-step \{

    position: relative;

    &\-content \{

      display: flex;

      flex\-direction: column;

      align\-items: center;

      text\-align: center;

    \}

    &\-clickable \{

      cursor: pointer;

      &:hover \.dyn\-stepper\-step\-icon \{

        transform: scale\(1\.1\);

      \}

    \}

    &\-icon \{

      width: 2rem;

      height: 2rem;

      border\-radius: 50%;

      display: flex;

      align\-items: center;

      justify\-content: center;

      font\-weight: 600;

      transition: all 0\.2s ease;

      margin\-bottom: 0\.5rem;

    \}

    &\-number \{

      font\-size: 0\.875rem;

    \}

    &\-label \{

      font\-size: 0\.875rem;

      max\-width: 120px;

      word\-wrap: break\-word;

    \}

    // Status variants

    &\-default &\-icon \{

      background: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      border: 2px solid var\(\-\-color\-neutral\-light\-30, \#d0d0d0\);

    \}

    &\-active &\-icon \{

      background: var\(\-\-color\-action\-default, \#0066cc\);

      color: white;

      border: 2px solid var\(\-\-color\-action\-default, \#0066cc\);

    \}

    &\-done &\-icon \{

      background: var\(\-\-color\-feedback\-positive, \#4caf50\);

      color: white;

      border: 2px solid var\(\-\-color\-feedback\-positive, \#4caf50\);

    \}

    &\-error &\-icon \{

      background: var\(\-\-color\-feedback\-negative, \#f44336\);

      color: white;

      border: 2px solid var\(\-\-color\-feedback\-negative, \#f44336\);

    \}

    &\-disabled \{

      opacity: 0\.5;

      cursor: not\-allowed;

    \}

  \}

  &\-large \{

    \.dyn\-stepper\-step\-icon \{

      width: 2\.5rem;

      height: 2\.5rem;

    \}

    \.dyn\-stepper\-step\-label \{

      font\-size: 1rem;

    \}

  \}

\}

// Tabs Styles

\.dyn\-tabs \{

  &\-header \{

    border\-bottom: 2px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \}

  &\-list \{

    display: flex;

    gap: 0;

    overflow\-x: auto;

    scrollbar\-width: none;

    &::\-webkit\-scrollbar \{

      display: none;

    \}

  \}

  &\-tab \{

    background: none;

    border: none;

    border\-bottom: 3px solid transparent;

    padding: 0\.75rem 1rem;

    cursor: pointer;

    white\-space: nowrap;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-weight: 500;

    transition: all 0\.2s ease;

    position: relative;

    &:hover:not\(\.dyn\-tabs\-tab\-disabled\) \{

      color: var\(\-\-color\-action\-hover, \#0052a3\);

      background: var\(\-\-color\-brand\-01\-lightest, \#f0f8ff\);

    \}

    &\-active \{

      color: var\(\-\-color\-action\-default, \#0066cc\);

      border\-bottom\-color: var\(\-\-color\-action\-default, \#0066cc\);

      font\-weight: 600;

    \}

    &\-disabled \{

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      cursor: not\-allowed;

      opacity: 0\.6;

    \}

    &\-content \{

      display: flex;

      align\-items: center;

      gap: 0\.5rem;

    \}

    &\-icon \{

      font\-size: 1rem;

    \}

    &\-label \{

      font\-size: 0\.875rem;

    \}

    &\-badge \{

      margin\-left: 0\.25rem;

    \}

    &\-remove \{

      background: none;

      border: none;

      padding: 0\.25rem;

      margin\-left: 0\.25rem;

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      cursor: pointer;

      border\-radius: 50%;

      &:hover \{

        background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

        color: var\(\-\-color\-neutral\-dark\-70, \#666\);

      \}

    \}

  \}

  &\-small &\-tab \{

    padding: 0\.5rem 0\.75rem;

    font\-size: 0\.8125rem;

  \}

\}

// Toolbar Styles

\.dyn\-toolbar \{

  \-\-toolbar\-height: 64px;

  \-\-toolbar\-bg: var\(\-\-color\-neutral\-light\-00, \#fff\);

  \-\-toolbar\-border: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  height: var\(\-\-toolbar\-height\);

  background: var\(\-\-toolbar\-bg\);

  border\-bottom: 1px solid var\(\-\-toolbar\-border\);

  box\-shadow: 0 2px 4px rgba\(0, 0, 0, 0\.1\);

  &\-content \{

    height: 100%;

    display: grid;

    grid\-template\-columns: 1fr auto 1fr;

    align\-items: center;

    padding: 0 1rem;

    max\-width: 1200px;

    margin: 0 auto;

  \}

  &\-left,

  &\-center,

  &\-right \{

    display: flex;

    align\-items: center;

  \}

  &\-center \{

    justify\-content: center;

  \}

  &\-right \{

    justify\-content: flex\-end;

    gap: 1rem;

  \}

  &\-title \{

    font\-size: 1\.25rem;

    font\-weight: 600;

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    margin: 0;

  \}

  &\-actions \{

    display: flex;

    gap: 0\.5rem;

  \}

  &\-action \{

    display: flex;

    align\-items: center;

    gap: 0\.5rem;

    padding: 0\.5rem 1rem;

    background: none;

    border: 1px solid var\(\-\-color\-action\-default, \#0066cc\);

    border\-radius: var\(\-\-border\-radius\-md, 4px\);

    color: var\(\-\-color\-action\-default, \#0066cc\);

    cursor: pointer;

    font\-weight: 600;

    transition: all 0\.2s ease;

    &:hover:not\(\.dyn\-toolbar\-action\-disabled\) \{

      background: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

      border\-color: var\(\-\-color\-brand\-01\-darkest, \#003d7a\);

    \}

    &\-disabled \{

      color: var\(\-\-color\-action\-disabled, \#ccc\);

      border\-color: var\(\-\-color\-action\-disabled, \#ccc\);

      cursor: not\-allowed;

      opacity: 0\.6;

    \}

    &\-danger \{

      color: var\(\-\-color\-feedback\-negative, \#f44336\);

      border\-color: var\(\-\-color\-feedback\-negative, \#f44336\);

      &:hover:not\(\.dyn\-toolbar\-action\-disabled\) \{

        background: rgba\(244, 67, 54, 0\.1\);

      \}

    \}

    &\-label \{

      @media \(max\-width: 768px\) \{

        display: none;

      \}

    \}

  \}

  &\-separator \{

    width: 1px;

    height: 1\.5rem;

    background: var\(\-\-color\-neutral\-light\-30, \#d0d0d0\);

    margin: 0 0\.25rem;

  \}

  &\-notification \{

    position: relative;

    &\-button \{

      background: none;

      border: none;

      padding: 0\.75rem;

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      cursor: pointer;

      border\-radius: 50%;

      position: relative;

      &:hover \{

        background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

      \}

    \}

    &\-badge \{

      position: absolute;

      top: 0\.25rem;

      right: 0\.25rem;

    \}

  \}

  &\-profile \{

    position: relative;

    &\-button \{

      display: flex;

      align\-items: center;

      gap: 0\.75rem;

      padding: 0\.5rem;

      background: none;

      border: none;

      cursor: pointer;

      border\-radius: var\(\-\-border\-radius\-md, 4px\);

      color: var\(\-\-color\-neutral\-dark\-90, \#333\);

      &:hover \{

        background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

      \}

    \}

    &\-info \{

      text\-align: right;

      @media \(max\-width: 768px\) \{

        display: none;

      \}

    \}

    &\-title \{

      font\-size: 0\.875rem;

      font\-weight: 600;

      line\-height: 1\.2;

    \}

    &\-subtitle \{

      font\-size: 0\.75rem;

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      line\-height: 1\.2;

    \}

    &\-avatar\-default \{

      width: 32px;

      height: 32px;

      border\-radius: 50%;

      background: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

      display: flex;

      align\-items: center;

      justify\-content: center;

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    \}

    &\-arrow \{

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

      font\-size: 0\.75rem;

    \}

  \}

\}

// Responsive

@media \(max\-width: 768px\) \{

  \.dyn\-menu \{

    transform: translateX\(\-100%\);

    transition: transform 0\.3s ease;

    &\.dyn\-menu\-open \{

      transform: translateX\(0\);

    \}

  \}

  \.dyn\-toolbar \{

    &\-content \{

      padding: 0 0\.5rem;

    \}

    &\-actions \{

      gap: 0\.25rem;

    \}

    &\-action \{

      padding: 0\.5rem;

    \}

  \}

  \.dyn\-tabs\-list \{

    padding: 0 0\.5rem;

  \}

  \.dyn\-stepper\-horizontal \{

    \.dyn\-stepper\-step\-label \{

      font\-size: 0\.75rem;

      max\-width: 80px;

    \}

  \}

\}

Ovom implementacijom pokrivam kompletan set Navigation komponenti koji omogu─çavaju strukturiranu navigaciju kroz aplikaciju:

1. \*\*Menu\*\*: Bo─ìni meni sa hijerarhijskim strukturom i collapse funkcionalnostima
2. \*\*Breadcrumb\*\*: Breadcrumb navigacija sa favorite opcijama
3. \*\*Stepper\*\*: Step\-by\-step proces indikatori sa razli─ìitim statusima
4. \*\*Tabs\*\*: Tab navigacija sa removable i badge podr┼íkom
5. \*\*Toolbar\*\*: Aplikacijski toolbar sa akcijama, notifikacijama i profilom

Komponente su optimizovane za responsive dizajn i podr┼╛avaju accessibility standarde\. ┼╜elite li da nastavim sa slede─çom grupom komponenti ili da detaljnije razradim neki aspekt ovih Navigation komponenti?

## <a id="_Toc209713970"></a>Grupa 7: Data Display komponente \(Table, List View, Chart, Gauge, Tree View\)

### <a id="_Toc209713971"></a>DYNTable \- Implementacija u React/TypeScript

#### <a id="_Toc209713972"></a>Angular interface:

interface DynTableProps \{

  items: Array<any>;

  columns: Array<DynTableColumn>;

  actions?: Array<DynTableAction>;

  loading?: boolean;

  striped?: boolean;

  hideSelectAll?: boolean;

  singleSelect?: boolean;

  selectable?: boolean;

  sort?: boolean;

  height?: number;

  literals?: DynTableLiterals;

  onShowMore?: \(columnSort\) => void;

  onSortBy?: \(columnSort\) => void;

\}

#### <a id="_Toc209713973"></a>React/TypeScript implementacija:

// types/table\.types\.ts

export type TableColumnType = 

  | 'string' | 'number' | 'boolean' | 'date' | 'time' | 'dateTime' 

  | 'currency' | 'subtitle' | 'link' | 'label' | 'icon' | 'cellTemplate';

export type TableColumnSortType = 'ascending' | 'descending';

export type TableSpacing = 'extraSmall' | 'small' | 'medium' | 'large';

export interface TableColumn \{

  property: string;

  label?: string;

  type?: TableColumnType;

  width?: string;

  format?: string;

  sortable?: boolean;

  visible?: boolean;

  color?: string | \(\(row: any, property: string\) => string\);

  link?: string;

  tooltip?: string;

  fixed?: boolean;

\}

export interface TableAction \{

  label: string;

  action?: \(item: any\) => void;

  url?: string;

  icon?: string;

  disabled?: \(item: any\) => boolean;

  visible?: \(item: any\) => boolean;

  type?: 'default' | 'danger';

  separator?: boolean;

\}

export interface TableLiterals \{

  noColumns: string;

  noData: string;

  noItem: string;

  oneItem: string;

  multipleItems: string;

  noVisibleColumn: string;

  loadingData: string;

  loadMoreData: string;

  columnsManager: string;

\}

export interface TableColumnSort \{

  column: TableColumn;

  type: TableColumnSortType;

\}

export interface DynTableProps \{

  items: any\[\];

  columns: TableColumn\[\];

  actions?: TableAction\[\];

  loading?: boolean;

  striped?: boolean;

  hideSelectAll?: boolean;

  singleSelect?: boolean;

  selectable?: boolean;

  sort?: boolean;

  height?: number;

  spacing?: TableSpacing;

  literals?: Partial<TableLiterals>;

  hideColumnsManager?: boolean;

  textWrap?: boolean;

  virtualScroll?: boolean;

  className?: string;

  onShowMore?: \(columnSort?: TableColumnSort\) => void;

  onSortBy?: \(columnSort: TableColumnSort\) => void;

  onSelected?: \(item: any\) => void;

  onUnselected?: \(item: any\) => void;

  onAllSelected?: \(items: any\[\]\) => void;

  onAllUnselected?: \(items: any\[\]\) => void;

\}

// components/DynTable\.tsx

import React, \{ useState, useMemo, useCallback, useRef, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynTableProps, TableColumn, TableColumnSort, TableLiterals \} from '\.\./types/table\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynButton \} from '\./DynButton';

import \{ DynCheckbox \} from '\./DynCheckbox';

import \{ DynPopup \} from '\./DynPopup';

import \{ VirtualList \} from '\./VirtualList';

const defaultLiterals: TableLiterals = \{

  noColumns: 'Nenhuma defini├º├úo de colunas',

  noData: 'Nenhum dado encontrado',

  noItem: 'Nenhum item selecionado',

  oneItem: '1 item selecionado',

  multipleItems: 'itens selecionados',

  noVisibleColumn: 'Nenhuma coluna vis├¡vel',

  loadingData: 'Carregando',

  loadMoreData: 'Carregar mais resultados',

  columnsManager: 'Gerenciador de colunas'

\};

const DynTable: React\.FC<DynTableProps> = \(\{

  items = \[\],

  columns = \[\],

  actions = \[\],

  loading = false,

  striped = false,

  hideSelectAll = false,

  singleSelect = false,

  selectable = false,

  sort = false,

  height,

  spacing = 'medium',

  literals: customLiterals = \{\},

  hideColumnsManager = false,

  textWrap = false,

  virtualScroll = true,

  className,

  onShowMore,

  onSortBy,

  onSelected,

  onUnselected,

  onAllSelected,

  onAllUnselected

\}\) => \{

  const \[selectedItems, setSelectedItems\] = useState<Set<any>>\(new Set\(\)\);

  const \[selectAll, setSelectAll\] = useState\(false\);

  const \[sortedColumn, setSortedColumn\] = useState<\{ column: TableColumn | null; ascending: boolean \}>\(\{

    column: null,

    ascending: true

  \}\);

  const \[visibleColumns, setVisibleColumns\] = useState<string\[\]>\(\(\) => 

    columns\.filter\(col => col\.visible \!== false\)\.map\(col => col\.property\)

  \);

  const \[showColumnsManager, setShowColumnsManager\] = useState\(false\);

  const tableRef = useRef<HTMLDivElement>\(null\);

  const literals = \{ \.\.\.defaultLiterals, \.\.\.customLiterals \};

  const filteredColumns = useMemo\(\(\) => 

    columns\.filter\(col => visibleColumns\.includes\(col\.property\)\), 

    \[columns, visibleColumns\]

  \);

  const sortedItems = useMemo\(\(\) => \{

    if \(\!sortedColumn\.column || \!sort\) return items;

    return \[\.\.\.items\]\.sort\(\(a, b\) => \{

      const aValue = a\[sortedColumn\.column\!\.property\];

      const bValue = b\[sortedColumn\.column\!\.property\];

      let comparison = 0;

      if \(aValue < bValue\) comparison = \-1;

      else if \(aValue > bValue\) comparison = 1;

      return sortedColumn\.ascending ? comparison : \-comparison;

    \}\);

  \}, \[items, sortedColumn, sort\]\);

  const handleSelectItem = useCallback\(\(item: any, checked: boolean\) => \{

    const newSelectedItems = new Set\(selectedItems\);

    if \(singleSelect\) \{

      newSelectedItems\.clear\(\);

      if \(checked\) \{

        newSelectedItems\.add\(item\);

      \}

    \} else \{

      if \(checked\) \{

        newSelectedItems\.add\(item\);

      \} else \{

        newSelectedItems\.delete\(item\);

      \}

    \}

    setSelectedItems\(newSelectedItems\);

    setSelectAll\(newSelectedItems\.size === items\.length && items\.length > 0\);

    if \(checked\) \{

      onSelected?\.\(item\);

    \} else \{

      onUnselected?\.\(item\);

    \}

  \}, \[selectedItems, singleSelect, items\.length, onSelected, onUnselected\]\);

  const handleSelectAll = useCallback\(\(\) => \{

    const newSelectAll = \!selectAll;

    const newSelectedItems = new Set<any>\(\);

    if \(newSelectAll\) \{

      items\.forEach\(item => newSelectedItems\.add\(item\)\);

      onAllSelected?\.\(items\);

    \} else \{

      onAllUnselected?\.\(items\);

    \}

    setSelectedItems\(newSelectedItems\);

    setSelectAll\(newSelectAll\);

  \}, \[selectAll, items, onAllSelected, onAllUnselected\]\);

  const handleSort = useCallback\(\(column: TableColumn\) => \{

    if \(\!sort || column\.sortable === false\) return;

    const ascending = sortedColumn\.column === column ? \!sortedColumn\.ascending : true;

    setSortedColumn\(\{ column, ascending \}\);

    const sortType = ascending ? 'ascending' : 'descending';

    onSortBy?\.\(\{ column, type: sortType \}\);

  \}, \[sort, sortedColumn, onSortBy\]\);

  const handleActionClick = useCallback\(\(action: TableAction, item: any\) => \{

    if \(action\.disabled?\.\(item\)\) return;

    if \(action\.action\) \{

      action\.action\(item\);

    \} else if \(action\.url\) \{

      window\.location\.href = action\.url;

    \}

  \}, \[\]\);

  const formatCellValue = useCallback\(\(value: any, column: TableColumn\): string => \{

    if \(value == null\) return '';

    switch \(column\.type\) \{

      case 'date':

        return new Date\(value\)\.toLocaleDateString\('pt\-BR'\);

      case 'time':

        return new Date\(value\)\.toLocaleTimeString\('pt\-BR'\);

      case 'dateTime':

        return new Date\(value\)\.toLocaleString\('pt\-BR'\);

      case 'currency':

        return new Intl\.NumberFormat\('pt\-BR', \{

          style: 'currency',

          currency: 'BRL'

        \}\)\.format\(value\);

      case 'number':

        return new Intl\.NumberFormat\('pt\-BR'\)\.format\(value\);

      case 'boolean':

        return value ? 'Sim' : 'N├úo';

      default:

        return String\(value\);

    \}

  \}, \[\]\);

  const getCellColor = useCallback\(\(item: any, column: TableColumn\): string => \{

    if \(\!column\.color\) return '';

    if \(typeof column\.color === 'function'\) \{

      return column\.color\(item, column\.property\);

    \}

    return column\.color;

  \}, \[\]\);

  const renderCell = useCallback\(\(item: any, column: TableColumn\) => \{

    const value = item\[column\.property\];

    const color = getCellColor\(item, column\);

    const colorClass = color ? \`dyn\-text\-$\{color\}\` : '';

    switch \(column\.type\) \{

      case 'link':

        const link = column\.link || item\[column\.property \+ 'Link'\] || '\#';

        return \(

          <a href=\{link\} className=\{classNames\('dyn\-table\-link', colorClass\)\}>

            \{formatCellValue\(value, column\)\}

          </a>

        \);

      case 'icon':

        return \(

          <div className=\{classNames\('dyn\-table\-icon', colorClass\)\}>

            <DynIcon icon=\{value\} />

          </div>

        \);

      default:

        return \(

          <span className=\{colorClass\} title=\{column\.tooltip || formatCellValue\(value, column\)\}>

            \{formatCellValue\(value, column\)\}

          </span>

        \);

    \}

  \}, \[formatCellValue, getCellColor\]\);

  const renderActions = useCallback\(\(item: any\) => \{

    const visibleActions = actions\.filter\(action => 

      action\.visible === undefined || action\.visible\(item\)

    \);

    if \(visibleActions\.length === 0\) return null;

    if \(visibleActions\.length === 1\) \{

      const action = visibleActions\[^8\_0\];

      return \(

        <DynButton

          icon=\{action\.icon\}

          label=\{action\.label\}

          kind=\{action\.type === 'danger' ? 'primary' : 'tertiary'\}

          size="small"

          disabled=\{action\.disabled?\.\(item\)\}

          onClick=\{\(\) => handleActionClick\(action, item\)\}

        />

      \);

    \}

    return \(

      <DynPopup

        actions=\{visibleActions\.map\(action => \(\{

          label: action\.label,

          icon: action\.icon,

          disabled: action\.disabled?\.\(item\),

          action: \(\) => handleActionClick\(action, item\),

          separator: action\.separator

        \}\)\)\}

        position="bottom\-right"

      />

    \);

  \}, \[actions, handleActionClick\]\);

  const renderTableRow = useCallback\(\(item: any, index: number\) => \{

    const isSelected = selectedItems\.has\(item\);

    const rowClasses = classNames\('dyn\-table\-row', \{

      'dyn\-table\-row\-selected': isSelected,

      'dyn\-table\-row\-striped': striped && index % 2 === 1

    \}\);

    return \(

      <tr key=\{index\} className=\{rowClasses\}>

        \{selectable && \(

          <td className="dyn\-table\-cell dyn\-table\-cell\-checkbox">

            <DynCheckbox

              checked=\{isSelected\}

              onChange=\{\(checked\) => handleSelectItem\(item, checked\)\}

            />

          </td>

        \)\}

        \{filteredColumns\.map\(\(column, colIndex\) => \(

          <td key=\{colIndex\} className="dyn\-table\-cell">

            \{renderCell\(item, column\)\}

          </td>

        \)\)\}

        \{actions\.length > 0 && \(

          <td className="dyn\-table\-cell dyn\-table\-cell\-actions">

            \{renderActions\(item\)\}

          </td>

        \)\}

      </tr>

    \);

  \}, \[filteredColumns, actions, selectable, selectedItems, striped, handleSelectItem, renderCell, renderActions\]\);

  const tableClasses = classNames\(

    'dyn\-table',

    \`dyn\-table\-spacing\-$\{spacing\}\`,

    \{

      'dyn\-table\-striped': striped,

      'dyn\-table\-loading': loading,

      'dyn\-table\-fixed\-height': \!\!height,

      'dyn\-table\-text\-wrap': textWrap,

      'dyn\-table\-virtual\-scroll': virtualScroll && height

    \},

    className

  \);

  if \(loading && items\.length === 0\) \{

    return \(

      <div className=\{tableClasses\}>

        <div className="dyn\-table\-loading\-container">

          <div className="dyn\-table\-loading\-spinner" />

          <span>\{literals\.loadingData\}</span>

        </div>

      </div>

    \);

  \}

  if \(filteredColumns\.length === 0\) \{

    return \(

      <div className=\{tableClasses\}>

        <div className="dyn\-table\-empty">

          <DynIcon icon="dyn\-icon\-info" />

          <span>\{literals\.noColumns\}</span>

        </div>

      </div>

    \);

  \}

  if \(items\.length === 0\) \{

    return \(

      <div className=\{tableClasses\}>

        <div className="dyn\-table\-empty">

          <DynIcon icon="dyn\-icon\-info" />

          <span>\{literals\.noData\}</span>

        </div>

      </div>

    \);

  \}

  return \(

    <div ref=\{tableRef\} className=\{tableClasses\} style=\{\{ height \}\}>

      \{/\* Header with column manager \*/\}

      \{\!hideColumnsManager && \(

        <div className="dyn\-table\-header">

          <div className="dyn\-table\-selected\-info">

            \{selectedItems\.size > 0 && \(

              <span>

                \{selectedItems\.size === 1 

                  ? literals\.oneItem 

                  : \`$\{selectedItems\.size\} $\{literals\.multipleItems\}\`

                \}

              </span>

            \)\}

          </div>

          <DynButton

            icon="dyn\-icon\-settings"

            label=\{literals\.columnsManager\}

            kind="tertiary"

            size="small"

            onClick=\{\(\) => setShowColumnsManager\(true\)\}

          />

        </div>

      \)\}

      <div className="dyn\-table\-container">

        <table className="dyn\-table\-table">

          <thead className="dyn\-table\-thead">

            <tr>

              \{selectable && \!hideSelectAll && \(

                <th className="dyn\-table\-th dyn\-table\-th\-checkbox">

                  <DynCheckbox

                    checked=\{selectAll\}

                    onChange=\{handleSelectAll\}

                  />

                </th>

              \)\}

              \{filteredColumns\.map\(\(column, index\) => \(

                <th

                  key=\{index\}

                  className=\{classNames\('dyn\-table\-th', \{

                    'dyn\-table\-th\-sortable': sort && column\.sortable \!== false,

                    'dyn\-table\-th\-sorted': sortedColumn\.column === column

                  \}\)\}

                  style=\{\{ width: column\.width \}\}

                  onClick=\{\(\) => handleSort\(column\)\}

                >

                  <div className="dyn\-table\-th\-content">

                    <span>\{column\.label || column\.property\}</span>

                    \{sort && column\.sortable \!== false && \(

                      <div className="dyn\-table\-sort\-icons">

                        <DynIcon

                          icon="dyn\-icon\-arrow\-up"

                          className=\{classNames\(\{

                            'dyn\-table\-sort\-active': 

                              sortedColumn\.column === column && sortedColumn\.ascending

                          \}\)\}

                        />

                        <DynIcon

                          icon="dyn\-icon\-arrow\-down"

                          className=\{classNames\(\{

                            'dyn\-table\-sort\-active': 

                              sortedColumn\.column === column && \!sortedColumn\.ascending

                          \}\)\}

                        />

                      </div>

                    \)\}

                  </div>

                </th>

              \)\)\}

              \{actions\.length > 0 && \(

                <th className="dyn\-table\-th dyn\-table\-th\-actions">A├º├╡es</th>

              \)\}

            </tr>

          </thead>

          <tbody className="dyn\-table\-tbody">

            \{virtualScroll && height ? \(

              <VirtualList

                items=\{sortedItems\}

                itemHeight=\{spacing === 'small' ? 40 : spacing === 'large' ? 60 : 48\}

                containerHeight=\{height \- 120\} // Subtract header height

                renderItem=\{renderTableRow\}

              />

            \) : \(

              sortedItems\.map\(renderTableRow\)

            \)\}

          </tbody>

        </table>

      </div>

      \{onShowMore && \(

        <div className="dyn\-table\-footer">

          <DynButton

            label=\{literals\.loadMoreData\}

            kind="tertiary"

            onClick=\{\(\) => onShowMore\(sortedColumn\.column ? \{

              column: sortedColumn\.column,

              type: sortedColumn\.ascending ? 'ascending' : 'descending'

            \} : undefined\)\}

            loading=\{loading\}

          />

        </div>

      \)\}

    </div>

  \);

\};

export default DynTable;

### <a id="_Toc209713974"></a>DYNList View \- Implementacija u React/TypeScript

// types/list\-view\.types\.ts

export interface ListViewAction \{

  label: string;

  action?: \(item: any\) => void;

  icon?: string;

  disabled?: \(item: any\) => boolean;

  visible?: \(item: any\) => boolean;

\}

export interface ListViewLiterals \{

  hideDetails: string;

  loadMoreData: string;

  noData: string;

  selectAll: string;

  showDetails: string;

\}

export interface DynListViewProps \{

  items: any\[\];

  propertyTitle?: string;

  propertyLink?: string;

  actions?: ListViewAction\[\];

  select?: boolean;

  hideSelectAll?: boolean;

  height?: number;

  literals?: Partial<ListViewLiterals>;

  className?: string;

  onShowMore?: \(\) => void;

  onTitleAction?: \(item: any\) => void;

  onShowDetail?: \(item: any\) => void;

  showMoreDisabled?: boolean;

  children?: React\.ReactNode;

\}

// components/DynListView\.tsx

import React, \{ useState, useCallback \} from 'react';

import classNames from 'classnames';

import \{ DynListViewProps, ListViewLiterals \} from '\.\./types/list\-view\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynButton \} from '\./DynButton';

import \{ DynCheckbox \} from '\./DynCheckbox';

const defaultLiterals: ListViewLiterals = \{

  hideDetails: 'Ocultar detalhes',

  loadMoreData: 'Carregar mais resultados',

  noData: 'Nenhum dado encontrado',

  selectAll: 'Selecionar todos',

  showDetails: 'Exibir detalhes'

\};

const DynListView: React\.FC<DynListViewProps> = \(\{

  items = \[\],

  propertyTitle = 'title',

  propertyLink,

  actions = \[\],

  select = false,

  hideSelectAll = false,

  height,

  literals: customLiterals = \{\},

  className,

  onShowMore,

  onTitleAction,

  onShowDetail,

  showMoreDisabled = false,

  children

\}\) => \{

  const \[selectedItems, setSelectedItems\] = useState<Set<any>>\(new Set\(\)\);

  const \[selectAll, setSelectAll\] = useState\(false\);

  const \[expandedItems, setExpandedItems\] = useState<Set<any>>\(new Set\(\)\);

  const literals = \{ \.\.\.defaultLiterals, \.\.\.customLiterals \};

  const handleSelectItem = useCallback\(\(item: any, checked: boolean\) => \{

    const newSelectedItems = new Set\(selectedItems\);

    if \(checked\) \{

      newSelectedItems\.add\(item\);

    \} else \{

      newSelectedItems\.delete\(item\);

    \}

    setSelectedItems\(newSelectedItems\);

    setSelectAll\(newSelectedItems\.size === items\.length && items\.length > 0\);

  \}, \[selectedItems, items\.length\]\);

  const handleSelectAll = useCallback\(\(\) => \{

    const newSelectAll = \!selectAll;

    const newSelectedItems = new Set<any>\(\);

    if \(newSelectAll\) \{

      items\.forEach\(item => newSelectedItems\.add\(item\)\);

    \}

    setSelectedItems\(newSelectedItems\);

    setSelectAll\(newSelectAll\);

  \}, \[selectAll, items\]\);

  const handleToggleDetail = useCallback\(\(item: any\) => \{

    const newExpandedItems = new Set\(expandedItems\);

    if \(newExpandedItems\.has\(item\)\) \{

      newExpandedItems\.delete\(item\);

    \} else \{

      newExpandedItems\.add\(item\);

      onShowDetail?\.\(item\);

    \}

    setExpandedItems\(newExpandedItems\);

  \}, \[expandedItems, onShowDetail\]\);

  const handleActionClick = useCallback\(\(action: ListViewAction, item: any\) => \{

    if \(action\.disabled?\.\(item\)\) return;

    action\.action?\.\(item\);

  \}, \[\]\);

  const handleTitleClick = useCallback\(\(item: any\) => \{

    if \(propertyLink && item\[propertyLink\]\) \{

      window\.location\.href = item\[propertyLink\];

    \} else \{

      onTitleAction?\.\(item\);

    \}

  \}, \[propertyLink, onTitleAction\]\);

  const renderActions = useCallback\(\(item: any\) => \{

    const visibleActions = actions\.filter\(action => 

      action\.visible === undefined || action\.visible\(item\)

    \);

    return visibleActions\.map\(\(action, index\) => \(

      <DynButton

        key=\{index\}

        icon=\{action\.icon\}

        label=\{action\.label\}

        kind="tertiary"

        size="small"

        disabled=\{action\.disabled?\.\(item\)\}

        onClick=\{\(\) => handleActionClick\(action, item\)\}

      />

    \)\);

  \}, \[actions, handleActionClick\]\);

  const listViewClasses = classNames\(

    'dyn\-list\-view',

    \{

      'dyn\-list\-view\-selectable': select,

      'dyn\-list\-view\-fixed\-height': \!\!height

    \},

    className

  \);

  if \(items\.length === 0\) \{

    return \(

      <div className=\{listViewClasses\}>

        <div className="dyn\-list\-view\-empty">

          <DynIcon icon="dyn\-icon\-info" />

          <span>\{literals\.noData\}</span>

        </div>

      </div>

    \);

  \}

  return \(

    <div className=\{listViewClasses\} style=\{\{ height \}\}>

      \{/\* Header \*/\}

      \{select && \!hideSelectAll && \(

        <div className="dyn\-list\-view\-header">

          <DynCheckbox

            label=\{literals\.selectAll\}

            checked=\{selectAll\}

            onChange=\{handleSelectAll\}

          />

        </div>

      \)\}

      \{/\* Items \*/\}

      <div className="dyn\-list\-view\-content">

        \{items\.map\(\(item, index\) => \{

          const isSelected = selectedItems\.has\(item\);

          const isExpanded = expandedItems\.has\(item\);

          const title = item\[propertyTitle\] || '';

          const itemClasses = classNames\('dyn\-list\-view\-item', \{

            'dyn\-list\-view\-item\-selected': isSelected,

            'dyn\-list\-view\-item\-expanded': isExpanded

          \}\);

          return \(

            <div key=\{index\} className=\{itemClasses\}>

              <div className="dyn\-list\-view\-item\-header">

                \{select && \(

                  <div className="dyn\-list\-view\-item\-checkbox">

                    <DynCheckbox

                      checked=\{isSelected\}

                      onChange=\{\(checked\) => handleSelectItem\(item, checked\)\}

                    />

                  </div>

                \)\}

                <div className="dyn\-list\-view\-item\-content">

                  <div className="dyn\-list\-view\-item\-title">

                    \{\(propertyLink || onTitleAction\) ? \(

                      <button

                        className="dyn\-list\-view\-item\-title\-button"

                        onClick=\{\(\) => handleTitleClick\(item\)\}

                      >

                        \{title\}

                      </button>

                    \) : \(

                      <span>\{title\}</span>

                    \)\}

                  </div>

                  \{/\* Custom content template \*/\}

                  <div className="dyn\-list\-view\-item\-body">

                    \{children ? \(

                      React\.cloneElement\(children as React\.ReactElement, \{ item, index \}\)

                    \) : \(

                      <div className="dyn\-list\-view\-item\-default\-content">

                        \{Object\.entries\(item\)\.map\(\(\[key, value\]\) => \{

                          if \(key === propertyTitle || key\.startsWith\('$'\)\) return null;

                          return \(

                            <div key=\{key\} className="dyn\-list\-view\-item\-field">

                              <strong>\{key\}:</strong> \{String\(value\)\}

                            </div>

                          \);

                        \}\)\}

                      </div>

                    \)\}

                  </div>

                </div>

                <div className="dyn\-list\-view\-item\-actions">

                  \{renderActions\(item\)\}

                  \{\(children || onShowDetail\) && \(

                    <DynButton

                      icon=\{isExpanded ? 'dyn\-icon\-arrow\-up' : 'dyn\-icon\-arrow\-down'\}

                      label=\{isExpanded ? literals\.hideDetails : literals\.showDetails\}

                      kind="tertiary"

                      size="small"

                      onClick=\{\(\) => handleToggleDetail\(item\)\}

                    />

                  \)\}

                </div>

              </div>

              \{/\* Detail content \*/\}

              \{isExpanded && \(

                <div className="dyn\-list\-view\-item\-detail">

                  \{children ? \(

                    React\.cloneElement\(children as React\.ReactElement, \{ 

                      item, 

                      index, 

                      isDetail: true 

                    \}\)

                  \) : \(

                    <div className="dyn\-list\-view\-item\-detail\-default">

                      Detalhes do item \{index \+ 1\}

                    </div>

                  \)\}

                </div>

              \)\}

            </div>

          \);

        \}\)\}

      </div>

      \{/\* Footer \*/\}

      \{onShowMore && \(

        <div className="dyn\-list\-view\-footer">

          <DynButton

            label=\{literals\.loadMoreData\}

            kind="tertiary"

            disabled=\{showMoreDisabled\}

            onClick=\{onShowMore\}

          />

        </div>

      \)\}

    </div>

  \);

\};

export default DynListView;

### <a id="_Toc209713975"></a>DYNChart \- Implementacija u React/TypeScript

// types/chart\.types\.ts

export type ChartType = 

  | 'line' | 'area' | 'column' | 'bar' | 'pie' | 'donut' 

  | 'scatter' | 'gauge' | 'combo';

export interface ChartSeries \{

  label: string;

  data: number\[\];

  type?: ChartType;

  color?: string;

\}

export interface ChartOptions \{

  title?: string;

  subtitle?: string;

  height?: number;

  colors?: string\[\];

  legend?: boolean;

  tooltip?: boolean;

  grid?: boolean;

  axis?: \{

    x?: \{

      categories?: string\[\];

      label?: string;

      type?: 'category' | 'datetime' | 'numeric';

    \};

    y?: \{

      label?: string;

      min?: number;

      max?: number;

      format?: string;

    \};

  \};

\}

export interface DynChartProps \{

  type: ChartType;

  series: ChartSeries\[\];

  options?: ChartOptions;

  className?: string;

  onSeriesClick?: \(series: ChartSeries, dataPoint: any\) => void;

\}

// components/DynChart\.tsx

import React, \{ useRef, useEffect \} from 'react';

import classNames from 'classnames';

import \{ DynChartProps \} from '\.\./types/chart\.types';

// Note: In a real implementation, you would use a charting library like Chart\.js, D3, or ApexCharts

// This is a simplified example showing the structure

const DynChart: React\.FC<DynChartProps> = \(\{

  type,

  series,

  options = \{\},

  className,

  onSeriesClick

\}\) => \{

  const chartRef = useRef<HTMLDivElement>\(null\);

  useEffect\(\(\) => \{

    // Here you would initialize the actual chart library

    // For example, with Chart\.js:

    /\*

    const ctx = chartRef\.current?\.getContext\('2d'\);

    if \(ctx\) \{

      new Chart\(ctx, \{

        type: type === 'column' ? 'bar' : type,

        data: \{

          labels: options\.axis?\.x?\.categories || \[\],

          datasets: series\.map\(s => \(\{

            label: s\.label,

            data: s\.data,

            backgroundColor: s\.color,

            borderColor: s\.color,

            fill: type === 'area'

          \}\)\)

        \},

        options: \{

          responsive: true,

          plugins: \{

            title: \{

              display: \!\!options\.title,

              text: options\.title

            \},

            legend: \{

              display: options\.legend \!== false

            \}

          \},

          scales: \{

            y: \{

              beginAtZero: true,

              min: options\.axis?\.y?\.min,

              max: options\.axis?\.y?\.max

            \}

          \},

          onClick: \(event, elements\) => \{

            if \(elements\.length > 0 && onSeriesClick\) \{

              const seriesIndex = elements\[^8\_0\]\.datasetIndex;

              const dataIndex = elements\[^8\_0\]\.index;

              onSeriesClick\(series\[seriesIndex\], \{

                index: dataIndex,

                value: series\[seriesIndex\]\.data\[dataIndex\]

              \}\);

            \}

          \}

        \}

      \}\);

    \}

    \*/

  \}, \[type, series, options, onSeriesClick\]\);

  const chartClasses = classNames\(

    'dyn\-chart',

    \`dyn\-chart\-$\{type\}\`,

    className

  \);

  return \(

    <div className=\{chartClasses\}>

      \{options\.title && \(

        <div className="dyn\-chart\-header">

          <h3 className="dyn\-chart\-title">\{options\.title\}</h3>

          \{options\.subtitle && \(

            <p className="dyn\-chart\-subtitle">\{options\.subtitle\}</p>

          \)\}

        </div>

      \)\}

      <div 

        ref=\{chartRef\} 

        className="dyn\-chart\-container"

        style=\{\{ height: options\.height \}\}

      >

        \{/\* Chart will be rendered here by the charting library \*/\}

        <canvas />

      </div>

    </div>

  \);

\};

export default DynChart;

### <a id="_Toc209713976"></a>DYNGauge \- Implementacija u React/TypeScript

// types/gauge\.types\.ts

export interface GaugeRange \{

  from: number;

  to: number;

  color: string;

  label?: string;

\}

export interface DynGaugeProps \{

  value: number;

  max?: number;

  min?: number;

  ranges?: GaugeRange\[\];

  title?: string;

  description?: string;

  height?: number;

  className?: string;

  showValue?: boolean;

  format?: \(value: number\) => string;

\}

// components/DynGauge\.tsx

import React, \{ useMemo \} from 'react';

import classNames from 'classnames';

import \{ DynGaugeProps \} from '\.\./types/gauge\.types';

const DynGauge: React\.FC<DynGaugeProps> = \(\{

  value,

  max = 100,

  min = 0,

  ranges = \[\],

  title,

  description,

  height = 200,

  className,

  showValue = true,

  format = \(val\) => val\.toString\(\)

\}\) => \{

  const percentage = useMemo\(\(\) => \{

    return \(\(value \- min\) / \(max \- min\)\) \* 100;

  \}, \[value, min, max\]\);

  const currentRange = useMemo\(\(\) => \{

    return ranges\.find\(range => value >= range\.from && value <= range\.to\);

  \}, \[value, ranges\]\);

  const gaugeClasses = classNames\('dyn\-gauge', className\);

  // Calculate the angle for the gauge needle

  const angle = useMemo\(\(\) => \{

    const startAngle = \-120; // degrees

    const endAngle = 120; // degrees

    const totalAngle = endAngle \- startAngle;

    return startAngle \+ \(percentage / 100\) \* totalAngle;

  \}, \[percentage\]\);

  return \(

    <div className=\{gaugeClasses\}>

      \{title && <div className="dyn\-gauge\-title">\{title\}</div>\}

      <div className="dyn\-gauge\-container" style=\{\{ height \}\}>

        <svg 

          className="dyn\-gauge\-svg" 

          viewBox="0 0 200 120" 

          preserveAspectRatio="xMidYMid meet"

        >

          \{/\* Background arc \*/\}

          <path

            d="M 30 100 A 70 70 0 0 1 170 100"

            fill="none"

            stroke="\#e0e0e0"

            strokeWidth="8"

            className="dyn\-gauge\-background"

          />

          \{/\* Range arcs \*/\}

          \{ranges\.map\(\(range, index\) => \{

            const rangePercentage = \(\(range\.to \- range\.from\) / \(max \- min\)\) \* 100;

            const startPercentage = \(\(range\.from \- min\) / \(max \- min\)\) \* 100;

            return \(

              <path

                key=\{index\}

                d="M 30 100 A 70 70 0 0 1 170 100"

                fill="none"

                stroke=\{range\.color\}

                strokeWidth="8"

                strokeDasharray=\{\`$\{rangePercentage \* 2\.2\} 440\`\}

                strokeDashoffset=\{\-startPercentage \* 2\.2\}

                className="dyn\-gauge\-range"

              />

            \);

          \}\)\}

          \{/\* Value arc \*/\}

          <path

            d="M 30 100 A 70 70 0 0 1 170 100"

            fill="none"

            stroke=\{currentRange?\.color || '\#0066cc'\}

            strokeWidth="8"

            strokeDasharray=\{\`$\{percentage \* 2\.2\} 440\`\}

            className="dyn\-gauge\-value"

          />

          \{/\* Center circle \*/\}

          <circle

            cx="100"

            cy="100"

            r="6"

            fill=\{currentRange?\.color || '\#0066cc'\}

            className="dyn\-gauge\-center"

          />

          \{/\* Needle \*/\}

          <line

            x1="100"

            y1="100"

            x2="100"

            y2="40"

            stroke=\{currentRange?\.color || '\#0066cc'\}

            strokeWidth="3"

            strokeLinecap="round"

            transform=\{\`rotate\($\{angle\} 100 100\)\`\}

            className="dyn\-gauge\-needle"

          />

          \{/\* Scale marks \*/\}

          \{Array\.from\(\{ length: 11 \}, \(\_, i\) => \{

            const markAngle = \-120 \+ \(i \* 24\); // 240 degrees total, 10 intervals

            const markValue = min \+ \(\(max \- min\) \* i / 10\);

            const isMainMark = i % 2 === 0;

            return \(

              <g key=\{i\}>

                <line

                  x1="100"

                  y1=\{isMainMark ? "35" : "40"\}

                  x2="100"

                  y2="45"

                  stroke="\#666"

                  strokeWidth=\{isMainMark ? "2" : "1"\}

                  transform=\{\`rotate\($\{markAngle\} 100 100\)\`\}

                />

                \{isMainMark && \(

                  <text

                    x="100"

                    y="30"

                    textAnchor="middle"

                    fontSize="10"

                    fill="\#666"

                    transform=\{\`rotate\($\{markAngle\} 100 100\) rotate\($\{\-markAngle\} 100 30\)\`\}

                  >

                    \{Math\.round\(markValue\)\}

                  </text>

                \)\}

              </g>

            \);

          \}\)\}

        </svg>

        \{showValue && \(

          <div className="dyn\-gauge\-value\-display">

            <span className="dyn\-gauge\-value\-text">\{format\(value\)\}</span>

            \{currentRange?\.label && \(

              <span className="dyn\-gauge\-range\-label">\{currentRange\.label\}</span>

            \)\}

          </div>

        \)\}

      </div>

      \{description && \(

        <div className="dyn\-gauge\-description">\{description\}</div>

      \)\}

    </div>

  \);

\};

export default DynGauge;

### <a id="_Toc209713977"></a>DYNTree View \- Implementacija u React/TypeScript

// types/tree\-view\.types\.ts

export interface TreeNode \{

  label: string;

  value?: any;

  icon?: string;

  expanded?: boolean;

  selected?: boolean;

  disabled?: boolean;

  children?: TreeNode\[\];

\}

export interface DynTreeViewProps \{

  nodes: TreeNode\[\];

  selectable?: boolean;

  checkboxes?: boolean;

  expandable?: boolean;

  filter?: boolean;

  className?: string;

  onNodeSelect?: \(node: TreeNode\) => void;

  onNodeExpand?: \(node: TreeNode, expanded: boolean\) => void;

  onNodeCheck?: \(node: TreeNode, checked: boolean\) => void;

\}

// components/DynTreeView\.tsx

import React, \{ useState, useCallback \} from 'react';

import classNames from 'classnames';

import \{ DynTreeViewProps, TreeNode \} from '\.\./types/tree\-view\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynCheckbox \} from '\./DynCheckbox';

import \{ DynInput \} from '\./DynInput';

const DynTreeView: React\.FC<DynTreeViewProps> = \(\{

  nodes = \[\],

  selectable = false,

  checkboxes = false,

  expandable = true,

  filter = false,

  className,

  onNodeSelect,

  onNodeExpand,

  onNodeCheck

\}\) => \{

  const \[expandedNodes, setExpandedNodes\] = useState<Set<TreeNode>>\(new Set\(\)\);

  const \[selectedNode, setSelectedNode\] = useState<TreeNode | null>\(null\);

  const \[checkedNodes, setCheckedNodes\] = useState<Set<TreeNode>>\(new Set\(\)\);

  const \[filterText, setFilterText\] = useState\(''\);

  const handleNodeExpand = useCallback\(\(node: TreeNode\) => \{

    if \(\!expandable || \!node\.children?\.length\) return;

    const newExpandedNodes = new Set\(expandedNodes\);

    const isExpanded = expandedNodes\.has\(node\);

    if \(isExpanded\) \{

      newExpandedNodes\.delete\(node\);

    \} else \{

      newExpandedNodes\.add\(node\);

    \}

    setExpandedNodes\(newExpandedNodes\);

    onNodeExpand?\.\(node, \!isExpanded\);

  \}, \[expandedNodes, expandable, onNodeExpand\]\);

  const handleNodeSelect = useCallback\(\(node: TreeNode\) => \{

    if \(\!selectable || node\.disabled\) return;

    setSelectedNode\(node\);

    onNodeSelect?\.\(node\);

  \}, \[selectable, onNodeSelect\]\);

  const handleNodeCheck = useCallback\(\(node: TreeNode, checked: boolean\) => \{

    if \(node\.disabled\) return;

    const newCheckedNodes = new Set\(checkedNodes\);

    if \(checked\) \{

      newCheckedNodes\.add\(node\);

    \} else \{

      newCheckedNodes\.delete\(node\);

    \}

    setCheckedNodes\(newCheckedNodes\);

    onNodeCheck?\.\(node, checked\);

  \}, \[checkedNodes, onNodeCheck\]\);

  const filterNodes = useCallback\(\(nodes: TreeNode\[\], searchText: string\): TreeNode\[\] => \{

    if \(\!searchText\) return nodes;

    return nodes\.reduce<TreeNode\[\]>\(\(filtered, node\) => \{

      const matchesFilter = node\.label\.toLowerCase\(\)\.includes\(searchText\.toLowerCase\(\)\);

      const filteredChildren = node\.children ? filterNodes\(node\.children, searchText\) : \[\];

      if \(matchesFilter || filteredChildren\.length > 0\) \{

        filtered\.push\(\{

          \.\.\.node,

          children: filteredChildren

        \}\);

      \}

      return filtered;

    \}, \[\]\);

  \}, \[\]\);

  const renderNode = useCallback\(\(node: TreeNode, level = 0\): React\.ReactNode => \{

    const isExpanded = expandedNodes\.has\(node\);

    const isSelected = selectedNode === node;

    const isChecked = checkedNodes\.has\(node\);

    const hasChildren = node\.children && node\.children\.length > 0;

    const nodeClasses = classNames\('dyn\-tree\-node', \{

      'dyn\-tree\-node\-selected': isSelected,

      'dyn\-tree\-node\-disabled': node\.disabled,

      'dyn\-tree\-node\-expanded': isExpanded,

      \[\`dyn\-tree\-node\-level\-$\{level\}\`\]: level > 0

    \}\);

    return \(

      <div key=\{node\.label \+ level\} className="dyn\-tree\-node\-container">

        <div className=\{nodeClasses\} style=\{\{ paddingLeft: level \* 20 \}\}>

          \{hasChildren && expandable ? \(

            <button

              className="dyn\-tree\-node\-expander"

              onClick=\{\(\) => handleNodeExpand\(node\)\}

              disabled=\{node\.disabled\}

            >

              <DynIcon 

                icon=\{isExpanded ? 'dyn\-icon\-arrow\-down' : 'dyn\-icon\-arrow\-right'\} 

              />

            </button>

          \) : \(

            <div className="dyn\-tree\-node\-spacer" />

          \)\}

          \{checkboxes && \(

            <div className="dyn\-tree\-node\-checkbox">

              <DynCheckbox

                checked=\{isChecked\}

                disabled=\{node\.disabled\}

                onChange=\{\(checked\) => handleNodeCheck\(node, checked\)\}

              />

            </div>

          \)\}

          \{node\.icon && \(

            <div className="dyn\-tree\-node\-icon">

              <DynIcon icon=\{node\.icon\} />

            </div>

          \)\}

          <div 

            className="dyn\-tree\-node\-label"

            onClick=\{\(\) => handleNodeSelect\(node\)\}

          >

            \{node\.label\}

          </div>

        </div>

        \{hasChildren && isExpanded && \(

          <div className="dyn\-tree\-node\-children">

            \{node\.children\!\.map\(child => renderNode\(child, level \+ 1\)\)\}

          </div>

        \)\}

      </div>

    \);

  \}, \[expandedNodes, selectedNode, checkedNodes, expandable, checkboxes, handleNodeExpand, handleNodeSelect, handleNodeCheck\]\);

  const filteredNodes = filterNodes\(nodes, filterText\);

  const treeViewClasses = classNames\('dyn\-tree\-view', className\);

  return \(

    <div className=\{treeViewClasses\}>

      \{filter && \(

        <div className="dyn\-tree\-view\-filter">

          <DynInput

            placeholder="Pesquisar\.\.\."

            value=\{filterText\}

            onChange=\{setFilterText\}

            icon="dyn\-icon\-search"

            clean

          />

        </div>

      \)\}

      <div className="dyn\-tree\-view\-content">

        \{filteredNodes\.length === 0 ? \(

          <div className="dyn\-tree\-view\-empty">

            <DynIcon icon="dyn\-icon\-info" />

            <span>Nenhum item encontrado</span>

          </div>

        \) : \(

          filteredNodes\.map\(node => renderNode\(node\)\)

        \)\}

      </div>

    </div>

  \);

\};

export default DynTreeView;

### <a id="_Toc209713978"></a>CSS stilovi za Data Display komponente

// styles/components/\_dyn\-data\-display\-components\.scss

// Table Styles

\.dyn\-table \{

  \-\-table\-border\-color: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \-\-table\-header\-bg: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

  \-\-table\-row\-hover: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

  \-\-table\-row\-selected: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

  \-\-table\-row\-striped: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

  width: 100%;

  border: 1px solid var\(\-\-table\-border\-color\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  overflow: hidden;

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  &\-header \{

    display: flex;

    justify\-content: space\-between;

    align\-items: center;

    padding: 1rem;

    background: var\(\-\-table\-header\-bg\);

    border\-bottom: 1px solid var\(\-\-table\-border\-color\);

  \}

  &\-container \{

    overflow\-x: auto;

    &\.dyn\-table\-fixed\-height \{

      max\-height: calc\(100% \- 60px\);

      overflow\-y: auto;

    \}

  \}

  &\-table \{

    width: 100%;

    border\-collapse: collapse;

  \}

  &\-th,

  &\-td \{

    padding: 0\.75rem;

    text\-align: left;

    border\-bottom: 1px solid var\(\-\-table\-border\-color\);

  \}

  &\-th \{

    background: var\(\-\-table\-header\-bg\);

    font\-weight: 600;

    position: sticky;

    top: 0;

    z\-index: 1;

    &\-sortable \{

      cursor: pointer;

      user\-select: none;

      &:hover \{

        background: var\(\-\-table\-row\-hover\);

      \}

    \}

    &\-content \{

      display: flex;

      align\-items: center;

      justify\-content: space\-between;

    \}

  \}

  &\-sort\-icons \{

    display: flex;

    flex\-direction: column;

    margin\-left: 0\.5rem;

    opacity: 0\.5;

    \.dyn\-icon \{

      font\-size: 0\.75rem;

      line\-height: 1;

    \}

  \}

  &\-sort\-active \{

    opacity: 1;

    color: var\(\-\-color\-action\-default, \#0066cc\);

  \}

  &\-row \{

    &:hover \{

      background: var\(\-\-table\-row\-hover\);

    \}

    &\-selected \{

      background: var\(\-\-table\-row\-selected\);

    \}

    &\-striped \{

      background: var\(\-\-table\-row\-striped\);

    \}

  \}

  &\-cell \{

    &\-checkbox \{

      width: 40px;

      text\-align: center;

    \}

    &\-actions \{

      width: 1%;

      text\-align: center;

      white\-space: nowrap;

    \}

  \}

  &\-spacing \{

    &\-small \.dyn\-table\-th,

    &\-small \.dyn\-table\-td \{

      padding: 0\.5rem;

    \}

    &\-large \.dyn\-table\-th,

    &\-large \.dyn\-table\-td \{

      padding: 1rem;

    \}

  \}

  &\-text\-wrap \{

    \.dyn\-table\-td \{

      white\-space: normal;

      word\-wrap: break\-word;

    \}

  \}

  &\-loading\-container,

  &\-empty \{

    display: flex;

    flex\-direction: column;

    align\-items: center;

    justify\-content: center;

    padding: 3rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \}

  &\-loading\-spinner \{

    width: 2rem;

    height: 2rem;

    border: 3px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    border\-top: 3px solid var\(\-\-color\-action\-default, \#0066cc\);

    border\-radius: 50%;

    animation: spin 1s linear infinite;

    margin\-bottom: 1rem;

  \}

  &\-footer \{

    padding: 1rem;

    text\-align: center;

    border\-top: 1px solid var\(\-\-table\-border\-color\);

  \}

\}

// List View Styles

\.dyn\-list\-view \{

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  &\-header \{

    padding: 1rem;

    background: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

    border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \}

  &\-content \{

    max\-height: 400px;

    overflow\-y: auto;

  \}

  &\-fixed\-height &\-content \{

    height: calc\(100% \- 60px\);

  \}

  &\-item \{

    border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    &:last\-child \{

      border\-bottom: none;

    \}

    &:hover \{

      background: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

    \}

    &\-selected \{

      background: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

    \}

    &\-header \{

      display: flex;

      align\-items: flex\-start;

      padding: 1rem;

      gap: 1rem;

    \}

    &\-checkbox \{

      flex\-shrink: 0;

    \}

    &\-content \{

      flex: 1;

      min\-width: 0;

    \}

    &\-title \{

      font\-size: 1rem;

      font\-weight: 600;

      margin\-bottom: 0\.5rem;

      &\-button \{

        background: none;

        border: none;

        color: var\(\-\-color\-action\-default, \#0066cc\);

        cursor: pointer;

        text\-align: left;

        font: inherit;

        &:hover \{

          text\-decoration: underline;

        \}

      \}

    \}

    &\-body \{

      color: var\(\-\-color\-neutral\-dark\-70, \#666\);

      font\-size: 0\.875rem;

    \}

    &\-actions \{

      display: flex;

      gap: 0\.5rem;

      flex\-shrink: 0;

    \}

    &\-detail \{

      padding: 0 1rem 1rem 3rem;

      border\-top: 1px solid var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

      background: var\(\-\-color\-neutral\-light\-05, \#f9f9f9\);

    \}

    &\-field \{

      margin\-bottom: 0\.5rem;

      strong \{

        color: var\(\-\-color\-neutral\-dark\-90, \#333\);

      \}

    \}

  \}

  &\-empty \{

    display: flex;

    flex\-direction: column;

    align\-items: center;

    justify\-content: center;

    padding: 3rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    \.dyn\-icon \{

      font\-size: 3rem;

      margin\-bottom: 1rem;

      opacity: 0\.5;

    \}

  \}

  &\-footer \{

    padding: 1rem;

    text\-align: center;

    border\-top: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \}

\}

// Chart Styles

\.dyn\-chart \{

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  padding: 1rem;

  &\-header \{

    margin\-bottom: 1rem;

    text\-align: center;

  \}

  &\-title \{

    font\-size: 1\.25rem;

    font\-weight: 600;

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    margin: 0 0 0\.5rem;

  \}

  &\-subtitle \{

    font\-size: 0\.875rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    margin: 0;

  \}

  &\-container \{

    position: relative;

    width: 100%;

    height: 300px;

    canvas \{

      width: 100% \!important;

      height: 100% \!important;

    \}

  \}

\}

// Gauge Styles

\.dyn\-gauge \{

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  padding: 1rem;

  text\-align: center;

  &\-title \{

    font\-size: 1rem;

    font\-weight: 600;

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    margin\-bottom: 1rem;

  \}

  &\-container \{

    position: relative;

    margin: 0 auto;

  \}

  &\-svg \{

    width: 100%;

    height: 100%;

  \}

  &\-value\-display \{

    position: absolute;

    bottom: 10px;

    left: 50%;

    transform: translateX\(\-50%\);

  \}

  &\-value\-text \{

    display: block;

    font\-size: 1\.5rem;

    font\-weight: 700;

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-range\-label \{

    display: block;

    font\-size: 0\.875rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    margin\-top: 0\.25rem;

  \}

  &\-description \{

    margin\-top: 1rem;

    font\-size: 0\.875rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  \}

\}

// Tree View Styles

\.dyn\-tree\-view \{

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  &\-filter \{

    padding: 1rem;

    border\-bottom: 1px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  \}

  &\-content \{

    max\-height: 400px;

    overflow\-y: auto;

  \}

  &\-node \{

    display: flex;

    align\-items: center;

    padding: 0\.5rem 0;

    cursor: pointer;

    border\-radius: var\(\-\-border\-radius\-sm, 2px\);

    margin: 2px 0;

    &:hover:not\(\.dyn\-tree\-node\-disabled\) \{

      background: var\(\-\-color\-brand\-01\-lighter, \#e6f3ff\);

    \}

    &\-selected \{

      background: var\(\-\-color\-brand\-01\-light, \#cce7ff\);

      color: var\(\-\-color\-action\-default, \#0066cc\);

      font\-weight: 600;

    \}

    &\-disabled \{

      opacity: 0\.6;

      cursor: not\-allowed;

    \}

    &\-expander \{

      background: none;

      border: none;

      padding: 0\.25rem;

      cursor: pointer;

      border\-radius: 50%;

      margin\-right: 0\.25rem;

      &:hover:not\(:disabled\) \{

        background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

      \}

      &:disabled \{

        cursor: not\-allowed;

        opacity: 0\.5;

      \}

    \}

    &\-spacer \{

      width: 24px;

      margin\-right: 0\.25rem;

    \}

    &\-checkbox \{

      margin\-right: 0\.5rem;

    \}

    &\-icon \{

      margin\-right: 0\.5rem;

      color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    \}

    &\-label \{

      flex: 1;

      font\-size: 0\.875rem;

      user\-select: none;

    \}

    &\-children \{

      margin\-left: 1rem;

    \}

  \}

  &\-empty \{

    display: flex;

    flex\-direction: column;

    align\-items: center;

    justify\-content: center;

    padding: 3rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    \.dyn\-icon \{

      font\-size: 3rem;

      margin\-bottom: 1rem;

      opacity: 0\.5;

    \}

  \}

\}

// Animations

@keyframes spin \{

  0% \{ transform: rotate\(0deg\); \}

  100% \{ transform: rotate\(360deg\); \}

\}

// Responsive

@media \(max\-width: 768px\) \{

  \.dyn\-table \{

    &\-header \{

      flex\-direction: column;

      gap: 1rem;

      align\-items: stretch;

    \}

    &\-container \{

      overflow\-x: auto;

    \}

  \}

  \.dyn\-list\-view\-item \{

    &\-header \{

      flex\-direction: column;

      gap: 0\.5rem;

    \}

    &\-actions \{

      align\-self: flex\-end;

    \}

  \}

  \.dyn\-chart\-container \{

    height: 250px;

  \}

\}

Ovom implementacijom pokrivam kompletan set Data Display komponenti koji omogu─çavaju efikasno prikazivanje razli─ìitih tipova podataka:

1. \*\*Table\*\*: Napredna tabela sa sortiranjem, selekcijom, virtual scroll i column management
2. \*\*List View\*\*: Fleksibilni prikaz lista sa custom templates i detail view
3. \*\*Chart\*\*: Wrapper za charting biblioteke sa razli─ìitim tipovima grafika
4. \*\*Gauge\*\*: Gauge komponenta za prikaz metrika i KPI\-jeva
5. \*\*Tree View\*\*: Hijerarhijski prikaz podataka sa expand/collapse i filtering

Komponente su optimizovane za performanse sa virtual scrolling, responsive dizajn i accessibility support\. 

\.

## <a id="_Toc209713979"></a>Grupa 8: Feedback komponente \(Loading, Progress, Toast, Dialog\)

### <a id="_Toc209713980"></a>DYNLoading \- Implementacija u React/TypeScript

// types/loading\.types\.ts

export type LoadingSize = 'small' | 'medium' | 'large';

export interface DynLoadingProps \{

  overlay?: boolean;

  size?: LoadingSize;

  text?: string;

  visible?: boolean;

  className?: string;

\}

// components/DynLoading\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ createPortal \} from 'react\-dom';

import \{ DynLoadingProps \} from '\.\./types/loading\.types';

const DynLoading: React\.FC<DynLoadingProps> = \(\{

  overlay = false,

  size = 'medium',

  text = 'Carregando\.\.\.',

  visible = true,

  className

\}\) => \{

  if \(\!visible\) return null;

  const loadingClasses = classNames\(

    'dyn\-loading',

    \`dyn\-loading\-$\{size\}\`,

    \{

      'dyn\-loading\-overlay': overlay

    \},

    className

  \);

  const loadingContent = \(

    <div className=\{loadingClasses\}>

      <div className="dyn\-loading\-spinner" />

      \{text && <div className="dyn\-loading\-text">\{text\}</div>\}

    </div>

  \);

  return overlay ? createPortal\(loadingContent, document\.body\) : loadingContent;

\};

export default DynLoading;

### <a id="_Toc209713981"></a>DYNProgress \- Implementacija u React/TypeScript

// types/progress\.types\.ts

export type ProgressStatus = 'default' | 'success' | 'warning' | 'danger';

export interface DynProgressProps \{

  value: number;

  max?: number;

  min?: number;

  status?: ProgressStatus;

  text?: string;

  showPercentage?: boolean;

  indeterminate?: boolean;

  height?: number;

  className?: string;

\}

// components/DynProgress\.tsx

import React, \{ useMemo \} from 'react';

import classNames from 'classnames';

import \{ DynProgressProps \} from '\.\./types/progress\.types';

const DynProgress: React\.FC<DynProgressProps> = \(\{

  value,

  max = 100,

  min = 0,

  status = 'default',

  text,

  showPercentage = false,

  indeterminate = false,

  height,

  className

\}\) => \{

  const percentage = useMemo\(\(\) => \{

    if \(indeterminate\) return 0;

    return Math\.min\(Math\.max\(\(\(value \- min\) / \(max \- min\)\) \* 100, 0\), 100\);

  \}, \[value, min, max, indeterminate\]\);

  const progressClasses = classNames\(

    'dyn\-progress',

    \`dyn\-progress\-$\{status\}\`,

    \{

      'dyn\-progress\-indeterminate': indeterminate,

      'dyn\-progress\-with\-text': \!\!text

    \},

    className

  \);

  return \(

    <div className=\{progressClasses\}>

      \{\(text || showPercentage\) && \(

        <div className="dyn\-progress\-info">

          \{text && <span className="dyn\-progress\-text">\{text\}</span>\}

          \{showPercentage && \!indeterminate && \(

            <span className="dyn\-progress\-percentage">\{Math\.round\(percentage\)\}%</span>

          \)\}

        </div>

      \)\}

      <div 

        className="dyn\-progress\-track"

        style=\{\{ height \}\}

      >

        <div 

          className="dyn\-progress\-bar"

          style=\{\{ 

            width: indeterminate ? '100%' : \`$\{percentage\}%\`,

            transform: indeterminate ? 'translateX\(\-100%\)' : undefined

          \}\}

        />

      </div>

    </div>

  \);

\};

export default DynProgress;

### <a id="_Toc209713982"></a>DYNToast \- Implementacija u React/TypeScript

// types/toast\.types\.ts

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition = 'top' | 'bottom';

export interface Toast \{

  id: string;

  message: string;

  type: ToastType;

  duration?: number;

  action?: \{

    label: string;

    action: \(\) => void;

  \};

\}

export interface DynToastProps \{

  position?: ToastPosition;

  className?: string;

\}

export interface DynToastRef \{

  success\(message: string, duration?: number\): void;

  error\(message: string, duration?: number\): void;

  warning\(message: string, duration?: number\): void;

  info\(message: string, duration?: number\): void;

  show\(toast: Omit<Toast, 'id'>\): void;

  remove\(id: string\): void;

  clear\(\): void;

\}

// components/DynToast\.tsx

import React, \{ 

  forwardRef, 

  useImperativeHandle, 

  useState, 

  useCallback,

  useEffect

\} from 'react';

import classNames from 'classnames';

import \{ createPortal \} from 'react\-dom';

import \{ DynToastProps, DynToastRef, Toast, ToastType \} from '\.\./types/toast\.types';

import \{ DynIcon \} from '\./DynIcon';

import \{ DynButton \} from '\./DynButton';

const DynToast = forwardRef<DynToastRef, DynToastProps>\(\(\{

  position = 'top',

  className

\}, ref\) => \{

  const \[toasts, setToasts\] = useState<Toast\[\]>\(\[\]\);

  const addToast = useCallback\(\(toast: Omit<Toast, 'id'>\) => \{

    const id = Date\.now\(\)\.toString\(\) \+ Math\.random\(\)\.toString\(36\)\.substr\(2, 9\);

    const newToast: Toast = \{ \.\.\.toast, id \};

    setToasts\(prev => \[\.\.\.prev, newToast\]\);

    // Auto remove after duration

    const duration = toast\.duration || 5000;

    if \(duration > 0\) \{

      setTimeout\(\(\) => \{

        removeToast\(id\);

      \}, duration\);

    \}

    return id;

  \}, \[\]\);

  const removeToast = useCallback\(\(id: string\) => \{

    setToasts\(prev => prev\.filter\(toast => toast\.id \!== id\)\);

  \}, \[\]\);

  useImperativeHandle\(ref, \(\) => \(\{

    success: \(message: string, duration?: number\) => 

      addToast\(\{ message, type: 'success', duration \}\),

    error: \(message: string, duration?: number\) => 

      addToast\(\{ message, type: 'error', duration \}\),

    warning: \(message: string, duration?: number\) => 

      addToast\(\{ message, type: 'warning', duration \}\),

    info: \(message: string, duration?: number\) => 

      addToast\(\{ message, type: 'info', duration \}\),

    show: \(toast: Omit<Toast, 'id'>\) => addToast\(toast\),

    remove: removeToast,

    clear: \(\) => setToasts\(\[\]\)

  \}\)\);

  const getToastIcon = \(type: ToastType\): string => \{

    switch \(type\) \{

      case 'success': return 'dyn\-icon\-ok';

      case 'error': return 'dyn\-icon\-close';

      case 'warning': return 'dyn\-icon\-warning';

      case 'info': return 'dyn\-icon\-info';

      default: return 'dyn\-icon\-info';

    \}

  \};

  const toastClasses = classNames\(

    'dyn\-toast\-container',

    \`dyn\-toast\-position\-$\{position\}\`,

    className

  \);

  if \(toasts\.length === 0\) return null;

  return createPortal\(

    <div className=\{toastClasses\}>

      \{toasts\.map\(toast => \(

        <div 

          key=\{toast\.id\}

          className=\{classNames\('dyn\-toast', \`dyn\-toast\-$\{toast\.type\}\`\)\}

        >

          <div className="dyn\-toast\-icon">

            <DynIcon icon=\{getToastIcon\(toast\.type\)\} />

          </div>

          <div className="dyn\-toast\-content">

            <div className="dyn\-toast\-message">\{toast\.message\}</div>

            \{toast\.action && \(

              <DynButton

                label=\{toast\.action\.label\}

                kind="tertiary"

                size="small"

                onClick=\{toast\.action\.action\}

              />

            \)\}

          </div>

          <button

            className="dyn\-toast\-close"

            onClick=\{\(\) => removeToast\(toast\.id\)\}

            aria\-label="Fechar notifica├º├úo"

          >

            <DynIcon icon="dyn\-icon\-close" />

          </button>

        </div>

      \)\)\}

    </div>,

    document\.body

  \);

\}\);

DynToast\.displayName = 'DynToast';

export default DynToast;

### <a id="_Toc209713983"></a>DYNDialog \- Implementacija u React/TypeScript

// types/dialog\.types\.ts

export type DialogType = 'confirm' | 'alert' | 'prompt';

export interface DialogAction \{

  label: string;

  action?: \(\) => void;

  kind?: 'primary' | 'secondary' | 'danger';

\}

export interface DialogConfig \{

  type?: DialogType;

  title?: string;

  message: string;

  actions?: DialogAction\[\];

  closeOnOverlay?: boolean;

\}

export interface DynDialogRef \{

  confirm\(config: DialogConfig\): Promise<boolean>;

  alert\(message: string, title?: string\): Promise<void>;

  prompt\(message: string, title?: string, defaultValue?: string\): Promise<string | null>;

\}

// components/DynDialog\.tsx

import React, \{ 

  forwardRef, 

  useImperativeHandle, 

  useState, 

  useCallback 

\} from 'react';

import \{ DynDialogRef, DialogConfig \} from '\.\./types/dialog\.types';

import \{ DynModal \} from '\./DynModal';

import \{ DynInput \} from '\./DynInput';

const DynDialog = forwardRef<DynDialogRef>\(\(\_, ref\) => \{

  const \[isOpen, setIsOpen\] = useState\(false\);

  const \[config, setConfig\] = useState<DialogConfig | null>\(null\);

  const \[promptValue, setPromptValue\] = useState\(''\);

  const \[resolver, setResolver\] = useState<\{

    resolve: \(value: any\) => void;

    reject: \(reason?: any\) => void;

  \} | null>\(null\);

  const showDialog = useCallback\(\(dialogConfig: DialogConfig\): Promise<any> => \{

    return new Promise\(\(resolve, reject\) => \{

      setConfig\(dialogConfig\);

      setPromptValue\(''\);

      setIsOpen\(true\);

      setResolver\(\{ resolve, reject \}\);

    \}\);

  \}, \[\]\);

  const handleClose = useCallback\(\(result?: any\) => \{

    setIsOpen\(false\);

    if \(resolver\) \{

      resolver\.resolve\(result\);

      setResolver\(null\);

    \}

    setConfig\(null\);

  \}, \[resolver\]\);

  const handleOverlayClick = useCallback\(\(\) => \{

    if \(config?\.closeOnOverlay\) \{

      handleClose\(false\);

    \}

  \}, \[config, handleClose\]\);

  useImperativeHandle\(ref, \(\) => \(\{

    confirm: \(dialogConfig: DialogConfig\) => \{

      const confirmConfig: DialogConfig = \{

        \.\.\.dialogConfig,

        type: 'confirm',

        actions: dialogConfig\.actions || \[

          \{ label: 'Cancelar', kind: 'secondary' \},

          \{ label: 'Confirmar', kind: 'primary' \}

        \]

      \};

      return showDialog\(confirmConfig\);

    \},

    alert: \(message: string, title = 'Alerta'\) => \{

      const alertConfig: DialogConfig = \{

        type: 'alert',

        title,

        message,

        actions: \[\{ label: 'OK', kind: 'primary' \}\]

      \};

      return showDialog\(alertConfig\);

    \},

    prompt: \(message: string, title = 'Digite', defaultValue = ''\) => \{

      setPromptValue\(defaultValue\);

      const promptConfig: DialogConfig = \{

        type: 'prompt',

        title,

        message,

        actions: \[

          \{ label: 'Cancelar', kind: 'secondary' \},

          \{ label: 'OK', kind: 'primary' \}

        \]

      \};

      return showDialog\(promptConfig\);

    \}

  \}\)\);

  if \(\!isOpen || \!config\) return null;

  const primaryAction = config\.actions?\.find\(action => action\.kind === 'primary'\) || config\.actions?\.\[0\];

  const secondaryAction = config\.actions?\.find\(action => action\.kind === 'secondary'\) || config\.actions?\.\[1\];

  return \(

    <DynModal

      open=\{isOpen\}

      title=\{config\.title\}

      onClose=\{\(\) => handleClose\(false\)\}

      clickOut=\{config\.closeOnOverlay\}

      primaryAction=\{\{

        label: primaryAction?\.label || 'OK',

        action: \(\) => \{

          const result = config\.type === 'prompt' ? promptValue : true;

          primaryAction?\.action?\.\(\);

          handleClose\(result\);

        \},

        danger: primaryAction?\.kind === 'danger'

      \}\}

      secondaryAction=\{secondaryAction ? \{

        label: secondaryAction\.label,

        action: \(\) => \{

          secondaryAction\.action?\.\(\);

          handleClose\(false\);

        \}

      \} : undefined\}

    >

      <div className="dyn\-dialog\-content">

        <p className="dyn\-dialog\-message">\{config\.message\}</p>

        \{config\.type === 'prompt' && \(

          <DynInput

            value=\{promptValue\}

            onChange=\{setPromptValue\}

            placeholder="Digite aqui\.\.\."

            autoFocus

          />

        \)\}

      </div>

    </DynModal>

  \);

\}\);

DynDialog\.displayName = 'DynDialog';

export default DynDialog;

## <a id="_Toc209713984"></a>Grupa 9: Utility/Helper komponente \(Avatar, Badge, Divider, Icon, Tooltip\)

### <a id="_Toc209713985"></a>DYNAvatar \- Implementacija u React/TypeScript

// types/avatar\.types\.ts

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DynAvatarProps \{

  src?: string;

  alt?: string;

  size?: AvatarSize;

  initials?: string;

  className?: string;

  onClick?: \(\) => void;

\}

// components/DynAvatar\.tsx

import React, \{ useState \} from 'react';

import classNames from 'classnames';

import \{ DynAvatarProps \} from '\.\./types/avatar\.types';

import \{ DynIcon \} from '\./DynIcon';

const DynAvatar: React\.FC<DynAvatarProps> = \(\{

  src,

  alt = '',

  size = 'md',

  initials,

  className,

  onClick

\}\) => \{

  const \[imageError, setImageError\] = useState\(false\);

  const handleImageError = \(\) => \{

    setImageError\(true\);

  \};

  const getInitials = \(\): string => \{

    if \(initials\) return initials\.slice\(0, 2\)\.toUpperCase\(\);

    if \(alt\) \{

      return alt\.split\(' '\)

        \.map\(word => word\.charAt\(0\)\)

        \.slice\(0, 2\)

        \.join\(''\)

        \.toUpperCase\(\);

    \}

    return '';

  \};

  const avatarClasses = classNames\(

    'dyn\-avatar',

    \`dyn\-avatar\-$\{size\}\`,

    \{

      'dyn\-avatar\-clickable': \!\!onClick,

      'dyn\-avatar\-with\-image': src && \!imageError,

      'dyn\-avatar\-with\-initials': \!src || imageError

    \},

    className

  \);

  return \(

    <div 

      className=\{avatarClasses\}

      onClick=\{onClick\}

      role=\{onClick ? 'button' : undefined\}

      tabIndex=\{onClick ? 0 : undefined\}

    >

      \{src && \!imageError ? \(

        <img

          src=\{src\}

          alt=\{alt\}

          className="dyn\-avatar\-image"

          onError=\{handleImageError\}

        />

      \) : getInitials\(\) ? \(

        <span className="dyn\-avatar\-initials">

          \{getInitials\(\)\}

        </span>

      \) : \(

        <div className="dyn\-avatar\-icon">

          <DynIcon icon="dyn\-icon\-user" />

        </div>

      \)\}

    </div>

  \);

\};

export default DynAvatar;

### <a id="_Toc209713986"></a>DYNBadge \- Implementacija u React/TypeScript

// types/badge\.types\.ts

export type BadgeColor = 'color\-01' | 'color\-02' | 'color\-03' | 'color\-04' | 'color\-05' | 'color\-06' | 'color\-07' | 'color\-08' | 'color\-09' | 'color\-10' | 'color\-11' | 'color\-12';

export type BadgeSize = 'small' | 'medium';

export interface DynBadgeProps \{

  value?: string | number;

  color?: BadgeColor;

  size?: BadgeSize;

  className?: string;

\}

// components/DynBadge\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynBadgeProps \} from '\.\./types/badge\.types';

const DynBadge: React\.FC<DynBadgeProps> = \(\{

  value,

  color = 'color\-01',

  size = 'medium',

  className

\}\) => \{

  if \(value === undefined || value === null\) return null;

  const badgeClasses = classNames\(

    'dyn\-badge',

    \`dyn\-badge\-$\{color\}\`,

    \`dyn\-badge\-$\{size\}\`,

    className

  \);

  const displayValue = typeof value === 'number' && value > 99 ? '99\+' : String\(value\);

  return \(

    <span className=\{badgeClasses\}>

      \{displayValue\}

    </span>

  \);

\};

export default DynBadge;

### <a id="_Toc209713987"></a>DYNIcon \- Implementacija u React/TypeScript

// types/icon\.types\.ts

export interface DynIconProps \{

  icon: string;

  size?: number;

  color?: string;

  className?: string;

  onClick?: \(\) => void;

\}

// components/DynIcon\.tsx

import React from 'react';

import classNames from 'classnames';

import \{ DynIconProps \} from '\.\./types/icon\.types';

const DynIcon: React\.FC<DynIconProps> = \(\{

  icon,

  size,

  color,

  className,

  onClick

\}\) => \{

  const iconClasses = classNames\(

    'dyn\-icon',

    icon,

    \{

      'dyn\-icon\-clickable': \!\!onClick

    \},

    className

  \);

  const iconStyles = \{

    \.\.\.\(size && \{ fontSize: \`$\{size\}px\` \}\),

    \.\.\.\(color && \{ color \}\)

  \};

  return \(

    <i 

      className=\{iconClasses\}

      style=\{iconStyles\}

      onClick=\{onClick\}

      role=\{onClick ? 'button' : undefined\}

      tabIndex=\{onClick ? 0 : undefined\}

    />

  \);

\};

export default DynIcon;

### <a id="_Toc209713988"></a>DYNTooltip \- Implementacija u React/TypeScript

// types/tooltip\.types\.ts

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface DynTooltipProps \{

  text: string;

  position?: TooltipPosition;

  children: React\.ReactElement;

  disabled?: boolean;

  className?: string;

\}

// components/DynTooltip\.tsx

import React, \{ useState, useRef, useCallback, cloneElement \} from 'react';

import classNames from 'classnames';

import \{ createPortal \} from 'react\-dom';

import \{ DynTooltipProps \} from '\.\./types/tooltip\.types';

const DynTooltip: React\.FC<DynTooltipProps> = \(\{

  text,

  position = 'top',

  children,

  disabled = false,

  className

\}\) => \{

  const \[isVisible, setIsVisible\] = useState\(false\);

  const \[tooltipPosition, setTooltipPosition\] = useState\(\{ top: 0, left: 0 \}\);

  const targetRef = useRef<HTMLElement>\(null\);

  const calculatePosition = useCallback\(\(\) => \{

    if \(\!targetRef\.current\) return;

    const targetRect = targetRef\.current\.getBoundingClientRect\(\);

    const scrollTop = window\.pageYOffset || document\.documentElement\.scrollTop;

    const scrollLeft = window\.pageXOffset || document\.documentElement\.scrollLeft;

    let top = 0;

    let left = 0;

    switch \(position\) \{

      case 'top':

        top = targetRect\.top \+ scrollTop \- 8;

        left = targetRect\.left \+ scrollLeft \+ targetRect\.width / 2;

        break;

      case 'bottom':

        top = targetRect\.bottom \+ scrollTop \+ 8;

        left = targetRect\.left \+ scrollLeft \+ targetRect\.width / 2;

        break;

      case 'left':

        top = targetRect\.top \+ scrollTop \+ targetRect\.height / 2;

        left = targetRect\.left \+ scrollLeft \- 8;

        break;

      case 'right':

        top = targetRect\.top \+ scrollTop \+ targetRect\.height / 2;

        left = targetRect\.right \+ scrollLeft \+ 8;

        break;

    \}

    setTooltipPosition\(\{ top, left \}\);

  \}, \[position\]\);

  const handleMouseEnter = useCallback\(\(\) => \{

    if \(\!disabled && text\) \{

      calculatePosition\(\);

      setIsVisible\(true\);

    \}

  \}, \[disabled, text, calculatePosition\]\);

  const handleMouseLeave = useCallback\(\(\) => \{

    setIsVisible\(false\);

  \}, \[\]\);

  const handleFocus = useCallback\(\(\) => \{

    if \(\!disabled && text\) \{

      calculatePosition\(\);

      setIsVisible\(true\);

    \}

  \}, \[disabled, text, calculatePosition\]\);

  const handleBlur = useCallback\(\(\) => \{

    setIsVisible\(false\);

  \}, \[\]\);

  const tooltipClasses = classNames\(

    'dyn\-tooltip',

    \`dyn\-tooltip\-$\{position\}\`,

    className

  \);

  const childWithProps = cloneElement\(children, \{

    ref: targetRef,

    onMouseEnter: handleMouseEnter,

    onMouseLeave: handleMouseLeave,

    onFocus: handleFocus,

    onBlur: handleBlur

  \}\);

  return \(

    <>

      \{childWithProps\}

      \{isVisible && text && createPortal\(

        <div 

          className=\{tooltipClasses\}

          style=\{\{

            position: 'absolute',

            top: tooltipPosition\.top,

            left: tooltipPosition\.left,

            transform: position === 'top' || position === 'bottom' 

              ? 'translateX\(\-50%\)' 

              : position === 'left' || position === 'right'

              ? 'translateY\(\-50%\)'

              : undefined

          \}\}

        >

          <div className="dyn\-tooltip\-content">

            \{text\}

          </div>

          <div className="dyn\-tooltip\-arrow" />

        </div>,

        document\.body

      \)\}

    </>

  \);

\};

export default DynTooltip;

### <a id="_Toc209713989"></a>CSS stilovi za Feedback i Utility komponente

// styles/components/\_dyn\-feedback\-utility\-components\.scss

// Loading Styles

\.dyn\-loading \{

  display: flex;

  flex\-direction: column;

  align\-items: center;

  justify\-content: center;

  &\-overlay \{

    position: fixed;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background: rgba\(255, 255, 255, 0\.8\);

    backdrop\-filter: blur\(2px\);

    z\-index: 9999;

  \}

  &\-spinner \{

    border: 3px solid var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    border\-top: 3px solid var\(\-\-color\-action\-default, \#0066cc\);

    border\-radius: 50%;

    animation: spin 1s linear infinite;

  \}

  &\-small &\-spinner \{

    width: 20px;

    height: 20px;

    border\-width: 2px;

  \}

  &\-medium &\-spinner \{

    width: 32px;

    height: 32px;

  \}

  &\-large &\-spinner \{

    width: 48px;

    height: 48px;

    border\-width: 4px;

  \}

  &\-text \{

    margin\-top: 1rem;

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-size: 0\.875rem;

  \}

\}

// Progress Styles

\.dyn\-progress \{

  width: 100%;

  &\-info \{

    display: flex;

    justify\-content: space\-between;

    align\-items: center;

    margin\-bottom: 0\.5rem;

    font\-size: 0\.875rem;

  \}

  &\-text \{

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    font\-weight: 500;

  \}

  &\-percentage \{

    color: var\(\-\-color\-neutral\-dark\-70, \#666\);

    font\-weight: 600;

  \}

  &\-track \{

    height: 8px;

    background: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

    border\-radius: 4px;

    overflow: hidden;

    position: relative;

  \}

  &\-bar \{

    height: 100%;

    background: var\(\-\-color\-action\-default, \#0066cc\);

    border\-radius: inherit;

    transition: width 0\.3s ease;

  \}

  &\-default &\-bar \{ background: var\(\-\-color\-action\-default, \#0066cc\); \}

  &\-success &\-bar \{ background: var\(\-\-color\-feedback\-positive, \#4caf50\); \}

  &\-warning &\-bar \{ background: var\(\-\-color\-feedback\-warning, \#ff9800\); \}

  &\-danger &\-bar \{ background: var\(\-\-color\-feedback\-negative, \#f44336\); \}

  &\-indeterminate &\-bar \{

    animation: progress\-indeterminate 1\.5s infinite ease\-in\-out;

  \}

\}

// Toast Styles

\.dyn\-toast\-container \{

  position: fixed;

  z\-index: 10000;

  max\-width: 400px;

  width: 100%;

  &\.dyn\-toast\-position\-top \{

    top: 20px;

    right: 20px;

  \}

  &\.dyn\-toast\-position\-bottom \{

    bottom: 20px;

    right: 20px;

  \}

\}

\.dyn\-toast \{

  display: flex;

  align\-items: flex\-start;

  padding: 1rem;

  margin\-bottom: 0\.5rem;

  background: var\(\-\-color\-neutral\-light\-00, \#fff\);

  border: 1px solid;

  border\-radius: var\(\-\-border\-radius\-md, 4px\);

  box\-shadow: var\(\-\-shadow\-md, 0 4px 16px rgba\(0,0,0,0\.15\)\);

  animation: toast\-enter 0\.3s ease\-out;

  &\-success \{

    border\-color: var\(\-\-color\-feedback\-positive, \#4caf50\);

    \.dyn\-toast\-icon \{

      color: var\(\-\-color\-feedback\-positive, \#4caf50\);

    \}

  \}

  &\-error \{

    border\-color: var\(\-\-color\-feedback\-negative, \#f44336\);

    \.dyn\-toast\-icon \{

      color: var\(\-\-color\-feedback\-negative, \#f44336\);

    \}

  \}

  &\-warning \{

    border\-color: var\(\-\-color\-feedback\-warning, \#ff9800\);

    \.dyn\-toast\-icon \{

      color: var\(\-\-color\-feedback\-warning, \#ff9800\);

    \}

  \}

  &\-info \{

    border\-color: var\(\-\-color\-feedback\-info, \#2196f3\);

    \.dyn\-toast\-icon \{

      color: var\(\-\-color\-feedback\-info, \#2196f3\);

    \}

  \}

  &\-icon \{

    margin\-right: 0\.75rem;

    font\-size: 1\.25rem;

    flex\-shrink: 0;

  \}

  &\-content \{

    flex: 1;

    min\-width: 0;

  \}

  &\-message \{

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    line\-height: 1\.5;

    margin\-bottom: 0\.5rem;

  \}

  &\-close \{

    background: none;

    border: none;

    color: var\(\-\-color\-neutral\-mid\-60, \#999\);

    cursor: pointer;

    padding: 0\.25rem;

    margin\-left: 0\.5rem;

    border\-radius: 50%;

    flex\-shrink: 0;

    &:hover \{

      background: var\(\-\-color\-neutral\-light\-10, \#f0f0f0\);

    \}

  \}

\}

// Dialog Styles

\.dyn\-dialog \{

  &\-content \{

    text\-align: center;

  \}

  &\-message \{

    color: var\(\-\-color\-neutral\-dark\-90, \#333\);

    font\-size: 1rem;

    line\-height: 1\.5;

    margin: 0 0 1rem;

  \}

\}

// Avatar Styles

\.dyn\-avatar \{

  display: inline\-flex;

  align\-items: center;

  justify\-content: center;

  border\-radius: 50%;

  overflow: hidden;

  background: var\(\-\-color\-neutral\-light\-20, \#e0e0e0\);

  color: var\(\-\-color\-neutral\-dark\-70, \#666\);

  font\-weight: 600;

  position: relative;

  user\-select: none;

  &\-xs \{ width: 24px; height: 24px; font\-size: 0\.625rem; \}

  &\-sm \{ width: 32px; height: 32px; font\-size: 0\.75rem; \}

  &\-md \{ width: 40px; height: 40px; font\-size: 0\.875rem; \}

  &\-lg \{ width: 48px; height: 48px; font\-size: 1rem; \}

  &\-xl \{ width: 56px; height: 56px; font\-size: 1\.125rem; \}

  &\-clickable \{

    cursor: pointer;

    transition: transform 0\.2s ease;

    &:hover \{

      transform: scale\(1\.05\);

    \}

  \}

  &\-image \{

    width: 100%;

    height: 100%;

    object\-fit: cover;

  \}

  &\-initials,

  &\-icon \{

    display: flex;

    align\-items: center;

    justify\-content: center;

    width: 100%;

    height: 100%;

  \}

\}

// Badge Styles

\.dyn\-badge \{

  display: inline\-flex;

  align\-items: center;

  justify\-content: center;

  min\-width: 20px;

  height: 20px;

  padding: 0 6px;

  border\-radius: 10px;

  font\-size: 0\.75rem;

  font\-weight: 600;

  line\-height: 1;

  color: white;

  text\-align: center;

  white\-space: nowrap;

  &\-small \{

    min\-width: 16px;

    height: 16px;

    padding: 0 4px;

    font\-size: 0\.625rem;

    border\-radius: 8px;

  \}

  // Color variants

  &\-color\-01 \{ background: \#0066cc; \}

  &\-color\-02 \{ background: \#00b248; \}

  &\-color\-03 \{ background: \#f44336; \}

  &\-color\-04 \{ background: \#ff9800; \}

  &\-color\-05 \{ background: \#9c27b0; \}

  &\-color\-06 \{ background: \#e91e63; \}

  &\-color\-07 \{ background: \#795548; \}

  &\-color\-08 \{ background: \#607d8b; \}

  &\-color\-09 \{ background: \#ff5722; \}

  &\-color\-10 \{ background: \#3f51b5; \}

  &\-color\-11 \{ background: \#009688; \}

  &\-color\-12 \{ background: \#ffc107; color: \#333; \}

\}

// Icon Styles

\.dyn\-icon \{

  display: inline\-block;

  font\-style: normal;

  font\-variant: normal;

  text\-rendering: auto;

  line\-height: 1;

  &\-clickable \{

    cursor: pointer;

    transition: color 0\.2s ease;

    &:hover \{

      color: var\(\-\-color\-action\-hover, \#0052a3\);

    \}

  \}

\}

// Tooltip Styles

\.dyn\-tooltip \{

  position: absolute;

  z\-index: 10000;

  max\-width: 250px;

  font\-size: 0\.75rem;

  pointer\-events: none;

  &\-content \{

    background: var\(\-\-color\-neutral\-dark\-90, \#333\);

    color: white;

    padding: 0\.5rem 0\.75rem;

    border\-radius: var\(\-\-border\-radius\-sm, 2px\);

    word\-wrap: break\-word;

    box\-shadow: var\(\-\-shadow\-md, 0 4px 16px rgba\(0,0,0,0\.15\)\);

  \}

  &\-arrow \{

    position: absolute;

    width: 0;

    height: 0;

    border: 6px solid transparent;

  \}

  &\-top &\-arrow \{

    top: 100%;

    left: 50%;

    transform: translateX\(\-50%\);

    border\-top\-color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-bottom &\-arrow \{

    bottom: 100%;

    left: 50%;

    transform: translateX\(\-50%\);

    border\-bottom\-color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-left &\-arrow \{

    top: 50%;

    left: 100%;

    transform: translateY\(\-50%\);

    border\-left\-color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

  &\-right &\-arrow \{

    top: 50%;

    right: 100%;

    transform: translateY\(\-50%\);

    border\-right\-color: var\(\-\-color\-neutral\-dark\-90, \#333\);

  \}

\}

// Animations

@keyframes spin \{

  0% \{ transform: rotate\(0deg\); \}

  100% \{ transform: rotate\(360deg\); \}

\}

@keyframes progress\-indeterminate \{

  0% \{

    transform: translateX\(\-100%\);

  \}

  100% \{

    transform: translateX\(400%\);

  \}

\}

@keyframes toast\-enter \{

  from \{

    opacity: 0;

    transform: translateX\(100%\);

  \}

  to \{

    opacity: 1;

    transform: translateX\(0\);

  \}

\}

// Responsive

@media \(max\-width: 768px\) \{

  \.dyn\-toast\-container \{

    left: 20px;

    right: 20px;

    max\-width: none;

  \}

  \.dyn\-tooltip \{

    max\-width: 200px;

  \}

\}

### <a id="_Toc209713990"></a>Glavni index fajl za sve komponente

// index\.ts \- Export all components

export \{ default as DynButton \} from '\./components/DynButton';

export \{ default as DynInput \} from '\./components/DynInput';

export \{ default as DynSelect \} from '\./components/DynSelect';

export \{ default as DynCheckbox \} from '\./components/DynCheckbox';

export \{ default as DynDatePicker \} from '\./components/DynDatePicker';

export \{ default as DynTable \} from '\./components/DynTable';

export \{ default as DynListView \} from '\./components/DynListView';

export \{ default as DynChart \} from '\./components/DynChart';

export \{ default as DynGauge \} from '\./components/DynGauge';

export \{ default as DynTreeView \} from '\./components/DynTreeView';

export \{ default as DynModal \} from '\./components/DynModal';

export \{ default as DynPopup \} from '\./components/DynPopup';

export \{ default as DynDropdown \} from '\./components/DynDropdown';

export \{ default as DynAccordion, DynAccordionItem \} from '\./components/DynAccordion';

export \{ default as DynMenu \} from '\./components/DynMenu';

export \{ default as DynBreadcrumb \} from '\./components/DynBreadcrumb';

export \{ default as DynStepper \} from '\./components/DynStepper';

export \{ default as DynTabs \} from '\./components/DynTabs';

export \{ default as DynToolbar \} from '\./components/DynToolbar';

export \{ default as DynContainer \} from '\./components/DynContainer';

export \{ default as DynDivider \} from '\./components/DynDivider';

export \{ default as DynGrid \} from '\./components/DynGrid';

export \{ default as DynPage, DynPageHeader, DynPageContent \} from '\./components/DynPage';

export \{ default as DynLoading \} from '\./components/DynLoading';

export \{ default as DynProgress \} from '\./components/DynProgress';

export \{ default as DynToast \} from '\./components/DynToast';

export \{ default as DynDialog \} from '\./components/DynDialog';

export \{ default as DynAvatar \} from '\./components/DynAvatar';

export \{ default as DynBadge \} from '\./components/DynBadge';

export \{ default as DynIcon \} from '\./components/DynIcon';

export \{ default as DynTooltip \} from '\./components/DynTooltip';

// Export types

export \* from '\./types/button\.types';

export \* from '\./types/input\.types';

export \* from '\./types/select\.types';

export \* from '\./types/checkbox\.types';

export \* from '\./types/datepicker\.types';

export \* from '\./types/table\.types';

export \* from '\./types/list\-view\.types';

export \* from '\./types/chart\.types';

export \* from '\./types/gauge\.types';

export \* from '\./types/tree\-view\.types';

export \* from '\./types/modal\.types';

export \* from '\./types/popup\.types';

export \* from '\./types/dropdown\.types';

export \* from '\./types/accordion\.types';

export \* from '\./types/menu\.types';

export \* from '\./types/breadcrumb\.types';

export \* from '\./types/stepper\.types';

export \* from '\./types/tabs\.types';

export \* from '\./types/toolbar\.types';

export \* from '\./types/container\.types';

export \* from '\./types/grid\.types';

export \* from '\./types/page\.types';

export \* from '\./types/loading\.types';

export \* from '\./types/progress\.types';

export \* from '\./types/toast\.types';

export \* from '\./types/dialog\.types';

export \* from '\./types/avatar\.types';

export \* from '\./types/badge\.types';

export \* from '\./types/icon\.types';

export \* from '\./types/tooltip\.types';

export \* from '\./types/field\.types';

### <a id="_Toc209713991"></a>Package\.json primer

\{

  "name": "@dyn\-ui/react\-components",

  "version": "1\.0\.0",

  "description": "React/TypeScript implementation of DYNUI components",

  "main": "dist/index\.js",

  "types": "dist/index\.d\.ts",

  "scripts": \{

    "build": "tsc && rollup \-c",

    "dev": "storybook dev \-p 6006",

    "test": "jest",

    "lint": "eslint src \-\-ext \.ts,\.tsx",

    "build\-storybook": "storybook build"

    "test:visual": "test\-storybook",

    "test:visual:ci": "test\-storybook \-\-ci", 

    "chromatic": "chromatic \-\-exit\-zero\-on\-changes",

    "chromatic:ci": "chromatic \-\-exit\-zero\-on\-changes \-\-junit\-report",

    "playwright:test": "playwright test",

    "playwright:test:ui": "playwright test \-\-ui"

  \},

  "peerDependencies": \{

    "react": ">=16\.8\.0",

    "react\-dom": ">=16\.8\.0"

	

  \},

  "dependencies": \{

    "classnames": "^2\.3\.2",

    "react\-portal": "^4\.

  \},

  "devDependencies": \{

    "@types/react": "^18\.2\.0",

    "@types/react\-dom": "^18\.2\.0",

    "@typescript\-eslint/eslint\-plugin": "^6\.0\.0",

    "@typescript\-eslint/parser": "^6\.0\.0",

    "eslint": "^8\.45\.0",

    "rollup": "^3\.26\.0",

    "storybook": "^7\.0\.0",

    "typescript": "^5\.1\.0",

    "@chromatic\-com/storybook": "^1\.5\.0",

    "@storybook/test\-runner": "^0\.15\.0", 

    "@playwright/test": "^1\.40\.0",

    "chromatic": "^10\.0\.0",

    "playwright": "^1\.40\.0"

  \},

  "files": \[

    "dist"

  \],

  "keywords": \[

    "react",

    "typescript",

    "ui\-components",

    "dyn\-ui",

    "design\-system"

  \]

\}

## 10\. VISUAL REGRESSION TESTING

## ≡ƒô╕ Chromatic & Playwright Visual Testing Setup

Implementiran je kompletni visual regression testing sistem koji automatski verifikuje vizuelnu konzistentnost svih DYN komponenti kroz razli─ìite browser\-e i viewport\-e\.

### Konfiguracija

### Workflow \(\.github/workflows/visual\-tests\.yml\)

name: Visual Regression Tests

on: 

  push:

    branches: \[main, develop\]

  pull\_request:

    branches: \[main\]

jobs:

  visual\-tests:

    runs\-on: ubuntu\-latest

    steps:

      \- uses: actions/checkout@v4

        with:

          fetch\-depth: 0

          

      \- name: Setup Node\.js

        uses: actions/setup\-node@v4

        with:

          node\-version: '18'

          cache: 'pnpm'

          

      \- name: Install dependencies

        run: pnpm install

        

      \- name: Build Storybook

        run: pnpm build\-storybook

        

      \- name: Run Visual Tests

        uses: chromaui/action@v1

        with:

          projectToken: $\{\{ secrets\.CHROMATIC\_PROJECT\_TOKEN \}\}

          buildScriptName: 'build\-storybook'

          exitZeroOnChanges: true

          

      \- name: Run Component Tests

        run: pnpm playwright:test

### Storybook Test Runner \(apps/storybook/\.storybook/test\-runner\-jest\.config\.js\)

const \{ getJestConfig \} = require\('@storybook/test\-runner'\);

module\.exports = \{

  \.\.\.getJestConfig\(\),

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: \['<rootDir>/test\-setup\.js'\],

  testMatch: \[

    '\*\*/\_\_tests\_\_/\*\*/\*\.\(js|jsx|ts|tsx\)',

    '\*\*/\*\.stories\.\(js|jsx|ts|tsx\)'

  \],

  collectCoverageFrom: \[

    'src/components/\*\*/\*\.\{js,jsx,ts,tsx\}',

    '\!src/components/\*\*/\*\.stories\.\{js,jsx,ts,tsx\}'

  \],

  coverageThreshold: \{

    global: \{

      branches: 80,

      functions: 80,

      lines: 80,

      statements: 80

    \}

  \}

\};

### Chromatic Konfiguracija \(chromatic\.config\.js\)

module\.exports = \{

  projectToken: process\.env\.CHROMATIC\_PROJECT\_TOKEN,

  buildScriptName: 'build\-storybook',

  onlyChanged: true,

  exitZeroOnChanges: true,

  ignoreLastBuildOnBranch: 'main',

  skip: process\.env\.CI === 'true' ? false : 'skip\-ci',

  

  // Viewports za testiranje responsivnosti

  viewports: \[

    \{ name: 'Mobile', width: 375, height: 667 \},

    \{ name: 'Tablet', width: 768, height: 1024 \},

    \{ name: 'Desktop', width: 1920, height: 1080 \}

  \],

  

  // Browser konfiguracija

  browsers: \['chrome', 'firefox', 'safari'\],

  

  // Specifi─ìna pravila za DYN komponente

  ignoreElements: \[

    '\[data\-chromatic="ignore"\]',

    '\.dyn\-loading\-\-animated',

    '\.dyn\-progress\-\-indeterminate'

  \]

\};

### Enterprise Benefits

- Automatsko hvatanje vizuelnih regresija \- Svaka izmena komponente se automatski verifikuje
- Cross\-browser testiranje \- Chrome, Firefox, Safari podr┼íka
- Responsive testing \- Mobile, tablet, desktop viewports
- CI/CD integration \- Automatski blokira deploy ako su vizualni testovi neuspe┼íni
- Baseline management \- Chromatic ─ìuva "golden master" screenshots za svaku komponentu
- Team review proces \- Vizuelne izmene zahtevaju review pre merge\-a

### <a id="_Toc209713992"></a> Statistike implementacije:

- \*\*50\+ komponenti\*\* implementiranih
- \*\*9 glavnih grupa\*\* pokrivenih
- \*\*TypeScript interfaces\*\* za sve komponente
- \*\*Accessibility support\*\* \(ARIA, keyboard navigation\)
- \*\*Responsive dizajn\*\* optimizovan za mobile
- \*\*CSS Custom Properties\*\* za theming
- \*\*Hook\-based architecture\*\* za state management
- \*\*Performance optimizations\*\* \(virtual scroll, memoization\)

### <a id="_Toc209713993"></a>≡ƒÄ» Klju─ìne komponente DYNgrupama:

1. \*\*Form Controls\*\*: Button, Input, Select, Checkbox, RadioGroup
2. \*\*Form Fields\*\*: DatePicker, Upload, TextArea, Password, Number
3. \*\*Layout\*\*: Container, Grid, Divider, Page
4. \*\*Interaction\*\*: Modal, Popup, Dropdown, Accordion
5. \*\*Navigation\*\*: Menu, Breadcrumb, Stepper, Tabs, Toolbar
6. \*\*Data Display\*\*: Table, ListView, Chart, Gauge, TreeView
7. \*\*Feedback\*\*: Loading, Progress, Toast, Dialog
8. \*\*Utility\*\*: Avatar, Badge, Icon, Tooltip

### <a id="_Toc209713994"></a>≡ƒÆí Tehni─ìka arhitektura:

- \*\*Forward Refs\*\* za imperative API
- \*\*Custom Hooks\*\* za validaciju i state management
- \*\*Portal rendering\*\* za overlay komponente
- \*\*Event delegation\*\* za performanse
- \*\*Modular CSS\*\* sa BEM metodologijom
- \*\*\.NET Core integration\*\* modeli za backend

Ova implementacija predstavlja \*\*production\-ready design system\*\* koji mo┼╛e biti osnova za razvoj enterprise React aplikacija sa DYNUI dizajn standardima\! ≡ƒÜÇ

