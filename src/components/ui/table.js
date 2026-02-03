import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown } from 'lucide-react'

/**
 * Table container component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Table content (TableHeader, TableBody)
 * @param {string} props.className - Additional CSS classes
 */
export function Table({ children, className }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className={cn('w-full', className)}>
        {children}
      </table>
    </div>
  )
}

/**
 * Table header component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - TableRow with TableHead cells
 * @param {string} props.className - Additional CSS classes
 */
export function TableHeader({ children, className }) {
  return (
    <thead className={cn('bg-muted border-b border-border', className)}>
      {children}
    </thead>
  )
}

/**
 * Table body component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - TableRow components
 * @param {string} props.className - Additional CSS classes
 */
export function TableBody({ children, className }) {
  return (
    <tbody className={cn('divide-y divide-border', className)}>
      {children}
    </tbody>
  )
}

/**
 * Table row component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - TableHead or TableCell components
 * @param {string} props.className - Additional CSS classes
 */
export function TableRow({ children, className, ...props }) {
  return (
    <tr
      className={cn('hover:bg-muted/50 transition-colors', className)}
      {...props}
    >
      {children}
    </tr>
  )
}

/**
 * Table header cell component (with optional sorting)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Column title
 * @param {boolean} props.sortable - Enable sorting
 * @param {Function} props.onSort - Sort handler
 * @param {'asc' | 'desc' | null} props.sortDirection - Current sort direction
 * @param {string} props.className - Additional CSS classes
 */
export function TableHead({
  children,
  sortable = false,
  onSort,
  sortDirection = null,
  className,
  ...props
}) {
  const baseStyles = 'px-4 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wider'

  if (sortable) {
    return (
      <th className={cn(baseStyles, className)} {...props}>
        <button
          onClick={onSort}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          {children}
          {sortDirection === 'asc' && <ChevronUp className="w-4 h-4" />}
          {sortDirection === 'desc' && <ChevronDown className="w-4 h-4" />}
          {!sortDirection && (
            <div className="w-4 h-4 opacity-0 group-hover:opacity-50">
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </button>
      </th>
    )
  }

  return (
    <th className={cn(baseStyles, className)} {...props}>
      {children}
    </th>
  )
}

/**
 * Table cell component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Cell content
 * @param {string} props.className - Additional CSS classes
 */
export function TableCell({ children, className, ...props }) {
  return (
    <td className={cn('px-4 py-3 text-sm text-foreground', className)} {...props}>
      {children}
    </td>
  )
}
